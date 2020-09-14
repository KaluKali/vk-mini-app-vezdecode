import * as types from "./actionTypes";
import bridge from "@vkontakte/vk-bridge";

export const setVkPayId = (vkpay_id) => ({
  type: types.SET_VKPAY_ID,
  payload: vkpay_id,
});

export const setVkCover = (image) => ({
  type: types.SET_VK_COVER,
  payload: image,
});

export const setVkForm = (form) => ({
  type: types.SET_VK_FORM,
  payload: form,
});

export const setVkUser = (user) => ({
  type: types.SET_VK_USER,
  payload: user,
});

export const getUser = () => dispatch => {
  bridge.send('VKWebAppGetUserInfo')
      .then(data =>dispatch(setVkUser(data)));
};
