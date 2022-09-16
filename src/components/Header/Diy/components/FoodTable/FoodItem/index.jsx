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

  /* //使用上面的useFetch钩子函数
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // 使用store内的fetchData方法
    const ctx = useContext(DiyContext)
  
    // 删除数据async await版
    const delData = useCallback(async () => {
      try {
        // 数据开始加载
        console.log('开始删除')
        setLoading(true);
        const response = await fetch(`http://localhost:1337/api/hans/${id}`, {
          method: 'delete'
        })
        // 判断是否返回了数据, 可以根据返回response对象中的ok或者status或者statusText属性来判断
        if (response.ok === false) {
          throw new Error('删除数据失败')
        }
        // 删除数据不需要返回结果了
  
  
        // 删除了表格一行的内容之后，表格不会自动刷新，他只会触发当前组件的刷新，而不会出发Diy组件的刷新
        // 因此我们需要重新fetch data 来刷新表格,可以通过props来直接传递，也可以通过useContext来传递
  
        ctx.fetchData()
      } catch (error) {
        // setLoading(false)
        console.log(error.message)
        setError(error)
      } finally {
        setLoading(false)
      }
    }, [ctx, id])
  
  */
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