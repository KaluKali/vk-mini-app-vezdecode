import React, { useEffect } from "react";
import {Root, ConfigProvider, Epic, Tabbar, TabbarItem} from "@vkontakte/vkui";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../state/reducers/vk/actions";

import MainView from "../Views/Root";
import SnippetEpicView from "../Views/SnippetEpic";

import {
    ROOT_VIEW, WITH_EPIC
} from "../constants/ViewConstants";

import { setPreviousPanel } from "../state/reducers/history/actions";

import "../styles/index.scss";
import "@vkontakte/vkui/dist/vkui.css";


const App = () => {
    const dispatch = useDispatch();
    const {activeView} = useSelector((state) => state.history);

    useEffect(() => {
        window.addEventListener("popstate", () => dispatch(setPreviousPanel()));
        dispatch(getUser());
    }, []);

    return (
        <ConfigProvider isWebView={true}>
            <Root id="APP" activeView={activeView}>
                <MainView id={ROOT_VIEW}/>
                <SnippetEpicView id={WITH_EPIC}/>
            </Root>
        </ConfigProvider>
    );
};

export default App;
