// import { UpdateTokenNTime } from "@/api/camera";

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  name: state => state.user.name,
  group_num: state => state.user.group_num
};
export default getters;
