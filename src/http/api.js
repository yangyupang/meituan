import service from './index'

//接口封装
export default {
    //登录
    getLogin({ username, password }) {
        return service.req('/users/login', {
            username,
            password
        })
    },
    //注册
    getRegister({ username, password, email }) {
        return service.req('/users/register', {
            username,
            password,
            email
        })
    },
    //获取定位
    getPosition() {
        return service.req('/position')
    },
    //获取所有省份
    getProvinces() {
        return service.req('/province')
    },
    //获取省份所有城市 
    //id为获取省份后得到的id
    //id也可以是获取省市关联得到的id
    getProvinces(id) {
        return service.req(`/citys/${id}`)
    },
    //省市关联
    getCity() {
        return service.req('/city')
    },
    //热门城市
    getHotCity() {
        return service.req('/hotCity')
    },
    //获取城市具体信息
    getHotCity(cityName) {
        return service.req(`/crumbs?city=${cityName}`)
    },
    //全部分类
    getMenu() {
        return service.req('/menu')
    },
    //热门搜索 city=城市名
    getHotPlace(cityName) {
        return service.req(`/hotPlace?city=${cityName}`)
    },
    //搜索建议 city=城市名&input=关键词 
    getSearchTop(cityName, input) {
        return service.req(`/searchTop?city=${cityName}&input=${input}`)
    },
    //根据关键词搜索 city=城市名&keyword=关键词
    // - 约会聚餐 => 美食
    // - 丽人spa => 丽人
    // - 电影演出 => 电影
    // - 品质出游 => 旅游
    // - 全部 => 景点
    getResults(cityName, keyword) {
        return service.req(`/results?city=${cityName}&keyword=${keyword}`)
    },
    //商铺详情 keyword=商铺名称&city=城市名
    getProducts(cityName, keyword) {
        return service.req(`/products?city=${cityName}&keyword=${keyword}`)
    },

}