import React from "react";
import { View } from "@vkontakte/vkui";
import { useSelector, useDispatch } from "react-redux";

import HelloPanel from "../../Panels/Hello";
import SelectCollectionTypePanel from "../../Panels/SelectType";
import TargetPanel from "../../Panels/SelectType/Target";
import RegularPanel from "../../Panels/SelectType/Regular";
import SnippedPanel from "../../Panels/Snippet";
import InvoicePanel from "../../Panels/SelectType/Target/invoices";
import AdditionallyPanel from "../../Panels/SelectType/Target/Additionally";
import DepSnippet from "../../Panels/Snippet/DepSnippet";

import {
  SELECT_TYPE_PANEL,
  HELLO_PANEL,
  TARGET_PANEL,
  REGULAR_PANEL, INVOICE_PANEL, ADDITIONALLY_PANEL, SNIPPET_PANEL, DEP_SNIPPET
} from "../../constants/PanelConstants";

import { setPreviousPanel } from "../../state/reducers/history/actions";


const MainView = () => {
  const dispatch = useDispatch();
  const { activePanel, history } = useSelector((state) => state.history);

  return (
      <View
          history={history}
          activePanel={activePanel}
          onSwipeBack={() => dispatch(setPreviousPanel())}
      >
        <HelloPanel id={HELLO_PANEL} />
        <SelectCollectionTypePanel id={SELECT_TYPE_PANEL} />
        <TargetPanel id={TARGET_PANEL} />
        <RegularPanel id={REGULAR_PANEL} />
        <InvoicePanel id={INVOICE_PANEL} />
        <AdditionallyPanel id={ADDITIONALLY_PANEL}/>
        <SnippedPanel id={SNIPPET_PANEL}/>
        <DepSnippet id={DEP_SNIPPET} />
      </View>
  );
};

export default MainView;
