import './Tasks.styles.css'

import Header from '../Header/Header'
import { useResize } from '../../hooks/useResize'
import Card from '../Card/Card'
import { cardsData } from './data'


const Tasks = () => {

    const { isPhone } = useResize()

    const limitString = (str) => {
        if(str.length > 150) {
            return { string: str.slice(0,150).concat("..."), addButton: true}
        }
        return { string: str, addButton: false}
    }  

    const renderAllCards = () => {
        return cardsData.map(data => <Card key={data.id} data={data}/>)
    }

  return (
    <>
    <Header />
    <main id="tasks">
        <section className='wrapper_list'>
            <div className='list_header'>
                <h2>Mis tareas</h2>
            </div>
            {isPhone ? (
                <>
                <div className='list phone'>
                {renderAllCards()}
                </div>
                </>
            ) : (
            <>
            <h2>escritorio</h2>
            <div className='list_group'>
                {renderAllCards()}
            </div>
            </>
            )}
            
        </section>
    </main>
    </>
  )
}

export default Tasks