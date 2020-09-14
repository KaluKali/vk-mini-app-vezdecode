import React from "react";
import {
    Alert, Button,
    Card,
    Div,
    Group,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Progress,
    RichCell, Separator,
    SimpleCell, Text
} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import {handleSetActivePanel, handleToPreviousPanel} from "../../core/Dispatcher";
import {useDispatch, useSelector} from "react-redux";
import {DEP_SNIPPET} from "../../constants/PanelConstants";

const Snippet = (props) => {
    const { id } = props;
    const dispatch = useDispatch();
    const image = useSelector(state =>state.vk.image);
    const form = useSelector(state =>state.vk.form);
    const user = useSelector(state =>state.vk.user);

    const parsedDate = Math.ceil(Math.abs(new Date(form.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => handleToPreviousPanel(dispatch)} />}>Тип сбора</PanelHeader>
            <Div>
                <div
                    style={{
                        border: '0.5px solid rgba(0, 0, 0, 0.08)',
                        boxSizing: 'border-box',
                        boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.01)',
                        borderRadius:'10px'
                    }}
                >
                    <div
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundPosition: 'center center',
                            backgroundSize: '100%, 140px',
                            height: '140px',
                            borderTopLeftRadius:'10px',
                            borderTopRightRadius:'10px',
                            backgroundRepeat: 'no-repeat',
                        }}>
                    </div>
                    <RichCell disabled multiline
                              caption={`${user.first_name} ${user.last_name} · ${ parsedDate ? `Закончится через ${parsedDate} дней` : `Пока не соберём сумму`} `}>{form.collection}</RichCell>
                    <Separator style={{ margin: '2px 0' }} />
                    <SimpleCell disabled after={<Button mode="outline" style={{marginLeft:'12px'}} onClick={() => handleSetActivePanel(dispatch, DEP_SNIPPET)}>Помочь</Button>}>
                        <Text weight="regular" >{ user.donate ? `Собрано ${user.donate} из ${form.sum}` : `Помогите первым`}
                        <br/><Progress value={user.donate*100/form.sum} style={{marginTop:'8px'}}/></Text>
                    </SimpleCell>
                </div>
            </Div>
        </Panel>
    );
};

Snippet.propTypes = {
    id: PropTypes.string.isRequired,
};
export default Snippet;
