import React from 'react'

export const AuthorBlocks = ({ btnIsModal }) => {
    return (
        <div className="position-absolute" style={styles.fixed}>
            <div className="d-block">
                <div className="row">
                    <button type="button" className="btn btn-primary mr-2" onClick={() => btnIsModal(true)}>Авторизация</button>
                </div>                
                <div className="clearfix"></div>
            </div>
        </div>
    )
}

export const FormSearch = () => {
    return (
        <form>
            <input className="form-control mx-auto shadow-sm border border-info" style={{width: '60%'}} type="search" placeholder="Начните вводить название книги или автора"/>
        </form>
    )
}

const styles = {
    fixed: {
        right: '0px',
        top: '0px',
        zIndex: 1050
    }
}