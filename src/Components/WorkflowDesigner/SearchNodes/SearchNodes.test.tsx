import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import {setupServer} from 'msw/node'
import WorkflowDesigner from "../WorkflowDesigner";
import { Provider } from "react-redux";
import store from "../../../store";
import { searchNodesHandler } from "../../../mocks/handlers";
import userEvent from "@testing-library/user-event";
import { searchNodes } from "../../../utils/apiCall";

const server = setupServer(
    searchNodesHandler
);


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('nodes search bar', () => {
    test('No visible item should be in the dom before search box be focused', async () => {
        render(<Provider store={store}>
            <WorkflowDesigner />
        </Provider>);
        const searchBar = await screen.findByTestId('nodes-search-bar');
        const listItems = within(searchBar).queryAllByTestId('listitem');
        await (waitFor(() => expect(listItems).toHaveLength(0)));
    });

    test('After clicking on search bar input all items should be shown', async () => {
        render(<Provider store={store}>
            <WorkflowDesigner />
        </Provider>);
        const searchBar = await screen.findByTestId('nodes-search-bar');
        await waitFor(() => expect(searchBar).toBeInTheDocument());


        const input = await within(searchBar).findByRole('combobox');
        await waitFor(() => expect(input).toBeInTheDocument());
        searchBar.focus();
        fireEvent.keyDown(searchBar, { key: 'ArrowDown' });
        fireEvent.keyDown(searchBar, { key: 'Enter' });

        const list = await screen.findByRole('listbox');
        const listItems = within(list).getAllByRole('listitem');
        await waitFor(() => expect(listItems).toHaveLength(3));
    });

    test('By inserting characters fast enough request to server should be called only once', async () => {
        jest.mock('../../../utils/apiCall', () => {
            const originalModule = jest.requireActual("../../../utils/apiCall");
            return {
                searchNodes: jest.fn(async (searchTerm) => {
                    return await originalModule.searchNodes(searchTerm);
                })
            }
        });
        const originalModule = jest.requireActual("../../../utils/apiCall");
        jest.spyOn(originalModule, 'searchNodes');
        render(<Provider store={store}>
            <WorkflowDesigner />
        </Provider>);
        const searchBar = await screen.findByTestId('nodes-search-bar');
        await (waitFor(() => expect(searchBar).toBeInTheDocument()));


        const input = await within(searchBar).findByRole('combobox');
        await waitFor(() => expect(input).toBeInTheDocument());
        searchBar.focus();
        fireEvent.keyDown(searchBar, { key: 'ArrowDown' });
        fireEvent.keyDown(searchBar, { key: 'Enter' });
        await userEvent.type(input, 'type', {delay: 10});
        await waitFor(() => expect(input).toHaveValue());
        await waitFor(() => expect(searchNodes).toBeCalledTimes(1));
    });
})