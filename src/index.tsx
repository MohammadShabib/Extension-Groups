
import React from 'react';
import {createRoot} from "react-dom/client";
import ExtensionList from "./popup/popup";

const App: React.FC = () => {
    const appContainer = document.createElement('div')
    document.body.appendChild(appContainer)
    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }
    const root = createRoot(appContainer)
    root.render(<ExtensionList />)
};
App()