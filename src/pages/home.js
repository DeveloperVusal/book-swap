import React, { useState } from 'react'

import Logo from '../assets/logo.jpg'
import { AuthorBlocks, FormSearch } from '../components/web-elements'
import { ModalOAuth } from '../components/modal'

export const AppPageHome = () => {
    const [isModal, setIsModal] = useState(false)

    function setBtnIsModal(value) {
        setIsModal(value)
    }
    
    return (
        <div className="container-xl mt-5 position-relative">
            <AuthorBlocks btnIsModal={setBtnIsModal}/>
            <ModalOAuth isModalAuth={isModal} btnIsModalClose={setBtnIsModal} />
            <div className="row">
                <div className="col">
                <img src={Logo} width="200px" className="mx-auto d-block" alt="Logo is Book Swap"/>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                <FormSearch />
                </div>
            </div>
        </div>
    )
}