import Card from './Card'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'




describe("Testing Card Component", () => {

const data = {
    title: "Title",
    createdAt: "1234",
    user: {
        userName: "Manolo"
    },
    status: "status",
    importance: "importance",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptatem optio sapiente esse nihil, ipsa id maxime, eius illo pariatur consectetur. Quos sunt culpa molestiae! Sint voluptatibus sapiente repudiandae harum?"
}
const editCardStatus = jest.fn()   
const deleteCard = jest.fn()


const props = {
    data,
    editCardStatus,
    deleteCard
}

it("should render", () => {
    render(<Card {...props}/>)

   
    screen.getByRole('heading', {
        name: /Title/i
      })
    screen.getByRole('heading', {
        name: /12\/31\/1233, 8:06:12 pm hs\./i
      })
    screen.getByRole('heading', {
        name: /Manolo/i
      })
    screen.getByRole('button', {
        name: /status/i
      })
    screen.getByRole('button', {
        name: /importance/i
      })
    
      verMas()
      clickOnVerMas()
    screen.getByText(/Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptatem optio sapiente esse nihil, ipsa id maxime, eius illo pariatur consectetur. Quos sunt culpa molestiae! Sint voluptatibus sapiente repudiandae harum?/i)
    screen.getByRole('button', {
        name: /ver menos/i
      })
    clickOnVerMenos()

})
})

const clickOnVerMas = () => {
    user.click(screen.getByRole('button', {
        name: /ver más/i
      }))
}

const clickOnVerMenos = () => {
    user.click(screen.getByRole('button', {
        name: /ver menos/i
      }))
}

const verMas = () => {
    screen.getByRole('button', {
        name: /ver más/i
      })
}

const close = () => {
    screen.getByRole('div', {
        name: /x/i
    })
}

