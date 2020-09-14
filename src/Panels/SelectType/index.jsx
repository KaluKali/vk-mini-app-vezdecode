import React from "react";
import PropTypes from "prop-types";
import {Panel, PanelHeader, PanelHeaderBack, Card, CardGrid, RichCell, Group} from "@vkontakte/vkui";
// Icons
import Icon28CalendarOutline from "@vkontakte/icons/dist/28/calendar_outline"
import Icon28TargetOutline from '@vkontakte/icons/dist/28/target_outline';
import Icon24ChevronRight from '@vkontakte/icons/dist/24/chevron_right';
// Actions
import { handleSetActivePanel, handleToPreviousPanel } from "../../core/Dispatcher";
// Panels
import { REGULAR_PANEL, TARGET_PANEL } from "../../constants/PanelConstants";
import {useDispatch} from "react-redux";


const SelectCollectionType = (props) => {
    const { id } = props;
    const dispatch = useDispatch();

    return (
        <Panel id={id} centered={true}>
            <PanelHeader left={<PanelHeaderBack onClick={() => handleToPreviousPanel(dispatch)} />}>Тип сбора</PanelHeader>
            <Group>
                <CardGrid>
                    <Card size="l" mode="outline" style={{background:'#F5F5F5'}} onClick={()=>handleSetActivePanel(dispatch, TARGET_PANEL)}>
                        <RichCell
                            disabled
                            multiline
                            before={<Icon28TargetOutline style={{color:'#3F8AE0', alignSelf:'center', marginRight:'12px'}}/>}
                            caption="Когда определенная цель"
                            after={<Icon24ChevronRight style={{color:'#B8C1CC'}} />}
                        >Целевой сбор</RichCell>
                    </Card>
                    <Card size="l" mode="outline" style={{background:'#F5F5F5'}} onClick={()=>handleSetActivePanel(dispatch, REGULAR_PANEL)}>
                        <RichCell
                            disabled
                            multiline
                            before={<Icon28CalendarOutline style={{color:'#3F8AE0', alignSelf:'center', marginRight:'12px'}}/>}
                            caption="Если помощь нужна ежемесячно"
                            after={<Icon24ChevronRight style={{color:'#B8C1CC'}} />}
                        >Регулярный сбор</RichCell>
                    </Card>
                </CardGrid>
            </Group>
        </Panel>
    );
};

SelectCollectionType.propTypes = {
    id: PropTypes.string.isRequired,
};

export default SelectCollectionType;
