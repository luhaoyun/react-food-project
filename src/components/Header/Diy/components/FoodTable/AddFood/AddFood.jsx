import React, { useCallback, useContext, useState } from 'react'
import useFetch from '../../../../../../hooks/useFetch'
import DiyContext from '../../../../../../store/diy-context'



export const AddFood = (props) => {

    const ctx = useContext(DiyContext)
    const [inputData, setInputData] = useState({
        // 在修改状态下，如果之前是添加新表单，则表单内肯定没数据，没数据则设为空，有数据则显示之前的数据
        name: props.hanData ? props.hanData.attributes.name : '',
        desc: props.hanData ? props.hanData.attributes.desc : '',
        price: props.hanData ? props.hanData.attributes.price : '',
        img: props.hanData ? props.hanData.attributes.img : ''
    })

    const { loading, error, fetchData: updateData } = useFetch({
        // put和post逻辑相近，如果props.hanData里是有数据的，则说明想要进行修改，如果没数据，则说明项进行添加数据
        url: props.hanData ? `hans/${props.hanData.id}` : 'hans',
        method: props.hanData ? 'put' : 'post'
    }, ctx.fetchData)
    //   注意：需要为addData传递请求体body参数，body里的数据在加载的时候是空的，请求体如果是空的inputData对象则会报错



    const addNameHandler = (e) => {
        setInputData(prevState => ({ ...prevState, name: e.target.value.trim() }))
    }
    const addDescHandler = (e) => {
        setInputData(prevState => ({ ...prevState, desc: e.target.value.trim() }))
    }
    const addPriceHandler = (e) => {
        setInputData(prevState => ({ ...prevState, price: e.target.value }))
    }
    const addImgHandler = (e) => {
        setInputData(prevState => ({ ...prevState, img: e.target.value.trim() }))
    }



    const submitHandler = () => {
        updateData(inputData)
    }
    const updateHandler = () => {
        updateData(inputData)
    }
    //useFetch钩子需要加参数
    return (
        <>
            <tr>
                <td> <input type="text" placeholder="添加名称" onChange={addNameHandler} value={inputData.name} /> </td>
                <td> <input type="text" placeholder="添加简介" onChange={addDescHandler} value={inputData.desc} /> </td>
                <td> <input type="number" placeholder="添加整数价格" onChange={addPriceHandler} value={inputData.price} /> </td>
                <td> <input type="text" placeholder="添加图片url连接" onChange={addImgHandler} value={inputData.img} /> </td>

                {/* 如果hanData没数据，按钮则只显示添加，反之，显示取消和修改两个按钮 */}
                <td>{!props.hanData ?
                    <button onClick={submitHandler}>添加</button> :
                    <>
                        <button onClick={() => { props.cancelEdit() }}>取消</button>
                        <button onClick={updateHandler}>确认</button>
                    </>}
                </td>
            </tr>

            {loading && (!props.hanData ? <tr><td colSpan={5}>正在添加数据...</td></tr> : <tr><td colSpan={5}>正在修改数据...</td></tr>)}

            {error && (!props.hanData ? <tr><td colSpan={5}>添加数据失败！</td></tr> : <tr><td colSpan={5}>修改数据失败！</td></tr>)}
        </>
    )
}
