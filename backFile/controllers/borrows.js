const { handleData } = require('../util')
const borrow_model = require('../models/borrows')

// 获取图书列表
const listAll = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await borrow_model.listAll()
    handleData(_data, res, 'borrow')
}

// 返回部分数据
const list = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await borrow_model.list(req.query)
    handleData(_data, res, 'borrow')
}

//添加借阅信息
const add = async (req,res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await borrow_model.add(req.body)
    handleData(_data, res, 'borrow')
}
//提醒用户更改
const edit = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await borrow_model.edit(req.body)
    handleData(_data, res, 'borrow')
}

//删除书籍
const remove = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await borrow_model.remove(req.query)
    // 如果数据已经删除了，同时删除图片
    handleData(_data, res, 'borrow')
}

module.exports = {
    listAll,
    add,
    list,
    edit,
    remove
}