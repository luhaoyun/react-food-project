import React, { useCallback, useContext, useState } from 'react'
import { AddFood } from '../AddFood/AddFood'
import classes from './index.css'
import useFetch from '../../../../../../hooks/useFetch'
import DiyContext from '../../../../../../store/diy-context'



const FoodItem = (props) => {
  const { han: { id, attributes: { name, desc, price, img } } } = props

  const ctx = useContext(DiyContext)
  // 注意App中的fetch是最开始定义的方法，且作为context在组件中可以直接调用
  // 而useFetch自定义钩子函数中没有自动更新页面回调函数，因此在第二个参数中传入ctx.fetchData函数来自动更新页面

  const { loading, error, fetchData: delData } = useFetch({
    url: `hans/${id}`,
    method: 'delete'
  }, ctx.fetchData)


  const [isEdit, setIsEdit] = useState(false);
  const deleteDataHandler = () => {
    delData()
  }
  const cancelEditHandler = () => {
    setIsEdit(false)
  }
  return (
    <>
      {!isEdit ?
        <tr >
          <td>{name}</td>
          <td>{desc}</td>
          <td>{price}</td>
          <td className={classes.Img}><img src={img} alt="汉堡包" /></td>
          <td>
            <button onClick={deleteDataHandler}>删除</button>
            <button onClick={() => { setIsEdit(true) }}>修改</button>
          </td>

        </tr> :
        <AddFood hanData={props.han} cancelEdit={cancelEditHandler} />}
      {loading && <tr><td colSpan={5}>正在删除数据...</td></tr>}
      {error && <tr><td colSpan={5}>删除数据失败！</td></tr>}
    </>
  )
}

export default FoodItem