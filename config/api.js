//开发环境
var base_url = "http://127.0.0.1:8080";
//
// var base_url = "https://api.szpinc.org/comments";

module.exports = {
  config_url: base_url + "/config/get_config",
  brand_url: base_url + "/banner/list",
  comment_list_url: base_url + "/comment/list",
  comment_model_list_url: base_url + "/comment/model/list",
  comment_post_url: base_url + "/comment/post" 
};