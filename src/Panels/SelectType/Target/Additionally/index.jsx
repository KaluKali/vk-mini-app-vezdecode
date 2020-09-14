import React from "react";
import {
    Button,
    FormLayout,
    FormLayoutGroup,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Radio,
    Select
} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import {handleSetActivePanel, handleToPreviousPanel} from "../../../../core/Dispatcher";
import { setVkForm } from "../../../../state/reducers/vk/actions";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {SNIPPET_PANEL} from "../../../../constants/PanelConstants";
import Snippet from "../../../Snippet";


const Additionally = (props) => {
    const { id } = props;
    const dispatch = useDispatch();
    const [checked, setCheck] = useState(null);
    const form = useSelector(state =>state.vk.form);
    const user = useSelector(state =>state.vk.user);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => handleToPreviousPanel(dispatch)} />}>Дополнительно</PanelHeader>
            <FormLayout>
                <Select top="Автор" defaultValue={'author'}>
                    <option value={'author'}>{user.first_name} {user.last_name}</option>
                </Select>
                <FormLayoutGroup top="Сбор завершится">
                    <Radio name="type" onChange={()=>setCheck(false)}>Когда соберём сумму</Radio>
                    <Radio name="type" onChange={()=>setCheck(true)}>В определённую дату</Radio>
                </FormLayoutGroup>
                { checked ? <Input top={'Дата окончания'} value={form.date} onChange={(e)=>{dispatch(setVkForm({date:e.target.value}))}} type={'date'} /> : null}
                <Button disabled={checked === null} size="xl" onClick={() => {
                    if (!checked) dispatch(setVkForm({date:''}));
                    handleSetActivePanel(dispatch, SNIPPET_PANEL)
                }}>Далее</Button>
            </FormLayout>
        </Panel>
    );
};

Additionally.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Additionally;
