import React from "react";
import {
    Button,
    Div, Header, InfoRow,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Progress,
    RichCell, Separator,
    SimpleCell, Subhead, Text, Title
} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import {handleToPreviousPanel} from "../../../core/Dispatcher";
import {useDispatch, useSelector} from "react-redux";
import {setVkUser} from "../../../state/reducers/vk/actions";

const DepSnippet = (props) => {
    const { id } = props;
    const dispatch = useDispatch();
    const image = useSelector(state =>state.vk.image);
    const form = useSelector(state =>state.vk.form);
    const user = useSelector(state =>state.vk.user);

    const parsedDate = Math.ceil(Math.abs(new Date(form.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => handleToPreviousPanel(dispatch)} />}>Пожертвования</PanelHeader>
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
                    <Div><Title level="1" weight="heavy" style={{marginBottom:'8px'}}>{form.collection}</Title>
                        <InfoRow header={`Автор ${user.first_name} ${user.last_name}`} />
                        <Subhead weight="regular " style={{color:'#818C99'}}>
                            { parsedDate ? `Сбор закончится через ${parsedDate} дней` : `Сбор закончится пока не соберём сумму`}
                        </Subhead>
                    </Div>
                    <Separator style={{ margin: '2px 0' }} />
                    <SimpleCell after={<Button mode="commerce" style={{marginLeft:'12px'}} onClick={()=>(dispatch(
                        setVkUser({donate:Math.sign(form.sum-user.donate)===-1 ? form.sum : user.donate+100})))}>Помочь</Button>}>
                        <Text weight="regular" >{ form.date === '' ?
                            `Нужно собрать ещё ${ form.sum >= user.donate ? form.sum-user.donate : '0'} \u20BD` :
                            `Нужно собрать ${ form.sum >= user.donate ? form.sum-user.donate : '0'} \u20BD до ${form.date}` }<br/></Text>
                        <Progress className="Progress" style={{marginTop:'8px' }} value={user.donate*100/form.sum}/>
                    </SimpleCell>
                    <Separator style={{ margin: '2px 0' }} />
                    <Div><Text weight="medium">{form.description}</Text></Div>
                </div>
            </Div>
        </Panel>
    );
};

DepSnippet.propTypes = {
    id: PropTypes.string.isRequired,
};
export default DepSnippet;
