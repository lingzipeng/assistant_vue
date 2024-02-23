import request from '@/utils/request.js'

//获取教师详细信息
export const teacherInfoService = () => {
    return request.get('/teacher')
}

//添加教师
export const teacherAddService = (teacherData) => {
    return request.post('/teacher/add', teacherData)
}

//更改教师
export const teacherUpdateService = (teacherData) => {
    return request.put('/teacher/update', teacherData)
}

//删除教师
export const teacherDeleteService = (id) => {
    return request.delete('/teacher/delete?id=' + id)
}