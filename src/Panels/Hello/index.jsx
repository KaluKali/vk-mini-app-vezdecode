import React from "react";
import {Panel, PanelHeader, Button, Placeholder} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import { SELECT_TYPE_PANEL } from "../../constants/PanelConstants";
import {handleSetActivePanel} from "../../core/Dispatcher";
import {useDispatch} from "react-redux";

const Hello = (props) => {
    const { id } = props;
    const dispatch = useDispatch();

    return (
        <Panel id={id}>
            <PanelHeader>Пожертвования</PanelHeader>
            <Placeholder
                // icon={<Icon56MessageReadOutline />}
                action={<Button onClick={() => handleSetActivePanel(dispatch, SELECT_TYPE_PANEL)}>Создать сбор</Button>}
                stretched
            >
                У Вас пока нет сборов.<br />Начните доброе дело.
            </Placeholder>
        </Panel>
    );
};

Hello.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Hello;
