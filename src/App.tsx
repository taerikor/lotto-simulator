import React from 'react'
import './style.css'

const App = () => {
    return (
        <div>
            <h1>LOTTO</h1>
    <div className="inputbox">
    <span className="bettext">배팅금액은</span>
        <form className="js-form form">
        <input type="number" className="js-bet" />
    </form>
        <span>,000원</span>
        <div className="buttonbox">
        <button className="js-betBtn">BET</button>
        <button className="js-speed">x2</button>
        <button className="js-reset">↻</button>
        </div>
    </div>
    <span className="js-error error"></span>
    <div className="js-betnumberbox betnumberbox">
        <h3>자동 번호</h3>
            <div className="js-betNumber numberball">0</div>
            <div className="js-betNumber numberball">0</div>
            <div className="js-betNumber numberball">0</div>
            <div className="js-betNumber numberball">0</div>
            <div className="js-betNumber numberball">0</div>
            <div className="js-betNumber numberball">0</div>
    </div>
    <div className="js-resultbox resultbox">
        <h3>당첨 번호</h3>
        <div className="js-resultNumber numberball">0</div>
        <div className="js-resultNumber numberball">0</div>
        <div className="js-resultNumber numberball">0</div>
        <div className="js-resultNumber numberball">0</div>
        <div className="js-resultNumber numberball">0</div>
        <div className="js-resultNumber numberball">0</div>
        <div className="js-resultNumber serviceball">0</div>
        </div>
    <div className="moneyinfo">
        <div className="js-winbox winbox">
            <h3>당첨 횟수</h3>
            <span className="js-rank">1등 : 0</span>
            <span className="js-rank">2등 : 0</span>
            <span className="js-rank">3등 : 0</span>
            <span className="js-rank">4등 : 0</span>
            <span className="js-rank">5등 : 0</span>
            <span className="js-rank">꽝 : 0</span>
        </div>
        <div className="rewardbox">
            <h3>당첨금</h3>
                <span className="reward">1등 : 1,952,160,000 원</span>
                <span className="reward">2등 : 54,226,666 원</span>
                <span className="reward">3등 : 1,390,427 원</span>
                <span className="reward">4등 : 50,000 원</span>
                <span className="reward">5등 : 5,000 원</span>
        </div>
    </div>
    <div className="js-getmoney">
        <span className="js-money money">수익: 0￦</span>
    </div>
        </div>
    )
}

export default App
