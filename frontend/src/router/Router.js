import React from 'react'
import {Route,Navigate, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Tours from "../pages/Tours"
import { TourDetails } from '../pages/TourDetails'
import { SearchResultList } from '../pages/SearchResultList'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'
import { ThankYou } from '../pages/ThankYou'
import { MasonryImagesGallery } from '../components/Image-gallery/MasonryImagesGallery'

export const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/Home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/tours' element={<Tours/>}/>
        <Route path='/gallery' element={<MasonryImagesGallery/>} />
        <Route path='/tours/:id' element={<TourDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/thank-you' element={<ThankYou/>}/>
        <Route path='/tours/search' element={<SearchResultList/>}/>
    </Routes>
  )
}
