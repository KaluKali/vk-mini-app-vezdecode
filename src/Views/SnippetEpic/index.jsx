import React from "react";
import {Epic, Tabbar, TabbarItem, View} from "@vkontakte/vkui";
import { useSelector, useDispatch } from "react-redux";

import DepSnippet from "../../Panels/Snippet/DepSnippet";

import {
  DEP_SNIPPET
} from "../../constants/PanelConstants";

import { setPreviousPanel } from "../../state/reducers/history/actions";


const SnippetEpic = () => {
  const dispatch = useDispatch();
  const { activePanel, history } = useSelector((state) => state.history);

  return (
      <View
          history={history}
          activePanel={activePanel}
          onSwipeBack={() => dispatch(setPreviousPanel())}
      >
        <DepSnippet id={DEP_SNIPPET} />
      </View>
  );
};

export default SnippetEpic;
