import React from 'react'
import classes from './LoadingAnimations.module.css'
import loadMoreIcon from '../../assets/loadMore.svg'

const LoadMore = () => {
    return (
        <div className={classes.loadMore}>
            <img src={loadMoreIcon} alt='' />
        </div>
    )
}

export default LoadMore
