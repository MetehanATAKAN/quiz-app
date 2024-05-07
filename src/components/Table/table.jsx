import React from 'react'

const Table = ({header,data}) => {
  return (
    <table>
        <thead>
        <tr>
            {
                header.map((head,index) =>(
                    <th key={index}> {head} </th>
                ) )
            }
        </tr>
        </thead>
        <tbody>
        {
            data.map((item,index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.question}</td>
                    <td>{item.correctAnswer}</td>
                    <td>{item.userAnswer}</td>
                    <td>{item.score}</td>
                </tr>
            ))
        }
        </tbody>
    </table>
  )
}

export default Table