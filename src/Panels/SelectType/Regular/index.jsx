import React from "react";
import {
    Avatar,
    Banner, Button,
    Div,
    File,
    FormLayout,
    Input,
    MiniInfoCell,
    Panel,
    PanelHeader,
    PanelHeaderBack, Select,
    SelectMimicry, SimpleCell, Textarea
} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import {handleToPreviousPanel, handleSetActivePanel} from "../../../core/Dispatcher";
import { setVkCover, setVkForm } from "../../../state/reducers/vk/actions";
import {useDispatch, useSelector} from "react-redux";
import Icon56GalleryOutline from '@vkontakte/icons/dist/56/gallery_outline';
import {INVOICE_PANEL, SNIPPET_PANEL} from "../../../constants/PanelConstants";
import Icon24DismissOverlay from '@vkontakte/icons/dist/24/dismiss_overlay';
import {useState} from "react";

const Regular = (props) => {
    const { id } = props;

    const dispatch = useDispatch();
    const image = useSelector(state =>state.vk.image);
    const form = useSelector(state =>state.vk.form);
    const vkpay_id = useSelector(state =>state.vk.vkpay_id);
    const user = useSelector(state =>state.vk.user);

    const [valid, setStatus] = useState(true);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => handleToPreviousPanel(dispatch)} />}>Целевой сбор</PanelHeader>
            <FormLayout>
                { image !== '' ?
                    <Div>
                        <div
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundPosition: 'center center',
                                backgroundSize: '100%, 140px',
                                height: '140px',
                                backgroundRepeat: 'no-repeat',
                                borderRadius: "10px"
                            }}>
                            <SimpleCell disabled after={<Icon24DismissOverlay onClick={()=>dispatch(setVkCover(''))} />}/>
                        </div>
                    </Div> :
                    <File before={<Icon56GalleryOutline width={22} height={22} />} accept="image/*" controlSize="xl" mode={'outline'}
                          style={{border: "1px dashed #3F8AE0", borderRadius: "10px", height:'140px', display:'flex', alignItems:'center', justifyContent:'center'}}
                          getRootRef={(ref)=>{
                              if (ref) {
                                  ref.onchange = e =>{
                                      e.preventDefault();
                                      const { files } = e.target;
                                      if (files.length){
                                          const fileReader = new FileReader();
                                          fileReader.onload = () =>dispatch(setVkCover(fileReader.result));
                                          fileReader.readAsDataURL(files[0]);
                                      }
                                  }
                              }
                          }}
                    >Загрузить обложку</File>
                }
                <Input top={'Название сбора'} value={form.collection} onChange={(e)=>{setStatus(true);dispatch(setVkForm({collection:e.target.value}))}} placeholder={'Название сбора'}
                       status={!valid && form.collection.length < 6 ? 'error' : null}
                       bottom={!valid && form.collection.length < 6 ? 'Название сбора не введено' : null}
                />
                <Input top={'Сумма, \u20BD'} value={form.sum ? form.sum : ''} onChange={(e)=>{setStatus(true); dispatch(setVkForm({sum:parseInt(e.target.value,10)}))}} placeholder={'Сколько нужно собрать?'} type={'number'}
                       status={!valid && form.sum === 0 ? 'error' : null}
                       bottom={!valid && form.sum === 0 ? 'Сумма сбора не введена' : null}
                />
                <Input top={'Цель'} value={form.target} onChange={(e)=>{setStatus(true);dispatch(setVkForm({target:e.target.value}))}} placeholder={'Например, лечение человека'}
                       status={!valid && form.target.length < 6 ? 'error' : null}
                       bottom={!valid && form.target.length < 6 ? 'Цель сбора не введена' : null}
                />
                <Textarea grow={false} top={'Описание'} value={form.description} onChange={(e)=>{setStatus(true);dispatch(setVkForm({description:e.target.value}))}} placeholder={'На что пойдут деньги и как они\nкому-то помогут?'}
                          status={!valid && form.description.length < 6 ? 'error' : null}
                          bottom={!valid && form.description.length < 6 ? 'Описание сбора не введено' : null}
                />
                <SelectMimicry
                    top="Куда получать деньги"
                    placeholder="Не выбрано"
                    status={!valid && form.vkpay_id === 0 ? 'error' : null}
                    bottom={!valid && form.vkpay_id === 0 ? 'Счет сбора не выбран' : null}
                    onClick={() => {setStatus(true);handleSetActivePanel(dispatch, INVOICE_PANEL)}}
                >{vkpay_id !== 0 ? `Счёт VK Pay · ${vkpay_id}` : ''}</SelectMimicry>
                <Select top="Автор" defaultValue={'author'}>
                    <option value={'author'}>{user.first_name} {user.last_name}</option>
                </Select>
                <Button size="xl" onClick={() => {
                    if (form.collection.length > 5 && form.sum > 0 && form.target.length > 5 && form.description.length > 5 && vkpay_id > 0) {
                        handleSetActivePanel(dispatch, SNIPPET_PANEL);
                    } else {
                        setStatus(false);
                    }
                }}>Создать сбор</Button>
            </FormLayout>
        </Panel>
    );
};

Regular.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Regular;
