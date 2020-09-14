import React from "react";
import {Cell, Group, List, Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import {handleToPreviousPanel} from "../../../core/Dispatcher";
import {useDispatch, useSelector} from "react-redux";

import { setVkPayId } from "../../../state/reducers/vk/actions";


import Icon24Done from "@vkontakte/icons/dist/24/done";

const Invoice = (props) => {
    const { id } = props;
    const dispatch = useDispatch();
    const vkpay_id = useSelector(state => state.vk.vkpay_id);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => handleToPreviousPanel(dispatch)} />}>Счет VK Pay</PanelHeader>
            <Group>
                <List>
                    <Cell
                        onClick={() => {
                            dispatch(setVkPayId(1234));
                            handleToPreviousPanel(dispatch)
                        }}
                        asideContent={vkpay_id===1234 ? <Icon24Done fill="var(--accent)" /> : null}
                    >
                        1234
                    </Cell>
                    <Cell
                        onClick={() => {
                            dispatch(setVkPayId(4321));
                            handleToPreviousPanel(dispatch)
                        }}
                        asideContent={vkpay_id===4321 ? <Icon24Done fill="var(--accent)" /> : null}
                    >
                        4321
                    </Cell>
                </List>
            </Group>
        </Panel>
    );
};

Invoice.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Invoice;
