// 나달 — 1인 매치 자취 코치 봇 · 랜딩 (스포티/코트 무드)
import { useEffect, useState } from 'react'
import styles from './App.module.css'
import TutorBotWidget from './components/TutorBotWidget'
import { openBot } from './lib/botBus'
// 랜딩 버튼은 봇을 '열기만' 한다. (하드코딩 질문 자동전송 제거)
const askBot = () => openBot()
import { ESSENTIALS, SUB_DIET, SERVES } from './data/knowledge'

function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  )
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  return [theme, () => setTheme((p) => (p === 'light' ? 'dark' : 'light'))]
}

export default function App() {
  const [theme, toggleTheme] = useTheme()

  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.brand}>
          <span className={styles.ball}>🎾</span>
          <span className={styles.brandName}>나달</span>
          <span className={styles.brandTag}>자취 코치</span>
        </div>
        <nav className={styles.navLinks}>
          <a href="#first">첫주 세팅</a>
          <a href="#diet">구독 다이어트</a>
          <a href="#serve">오늘의 서브</a>
        </nav>
        <div className={styles.navRight}>
          <button className={styles.themeBtn} onClick={toggleTheme} aria-label="테마 전환">
            {theme === 'light' ? '🌙' : '☀︀'}
          </button>
          <button className={styles.navCta} onClick={() => openBot()}>코트 입장</button>
        </div>
      </header>

      {/* 히어로 — 스코어보드 */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={`${styles.eyebrow} mono`}>TEAM 07 · 1인 매치 자취 코치</p>
          <h1 className={styles.title}>
            자취는<br /><span className={styles.hl}>긴 경기</span>예요.<br />
            매주 한 포인트씩.
          </h1>
          <p className={styles.lede}>
            첫 주 세팅부터 새는 구독료 정리까지, 나달이 매주 딱 하나의 실천을
            <b> “오늘의 서브”</b>로 건네요. 몰아붙이지 않아요 — 한 번에 한 포인트씩, 끝까지 함께.
          </p>
          <div className={styles.heroBtns}>
            <button className={styles.primary} onClick={() => askBot('이번 주에 처음 자취를 시작해요. 없으면 바로 불편한 필수템만 딱 골라줘. 과하지 않게.')}>
              🎾 첫 서브 받기
            </button>
            <a className={styles.ghost} href="#diet">구독 다이어트 보기 ↓</a>
          </div>
          <p className={styles.author}>박시영 · 미래융합대학 · TEAM 07</p>
        </div>

        <div className={styles.scoreboard} aria-hidden="true">
          <div className={styles.sbHead}>TODAY'S MATCH</div>
          <div className={styles.sbRow}><span>🏠 첫주 세팅</span><b className={styles.win}>GAME</b></div>
          <div className={styles.sbRow}><span>💳 구독 정리</span><b className={styles.serve}>SERVE</b></div>
          <div className={styles.sbRow}><span>🍚 끼니 챙기기</span><b>15 : 0</b></div>
          <div className={styles.sbRow}><span>🧺 살림 루틴</span><b>30 : 15</b></div>
          <div className={styles.sbNet} />
          <div className={styles.sbFoot}>나달과 함께라면 이길 수 있는 경기</div>
        </div>
      </section>

      {/* 첫주 세팅 */}
      <section id="first" className={styles.first}>
        <SecHead k="MATCH 1 / 첫주 세팅" title="지금 필요한 것 vs 나중에" />
        <div className={styles.firstGrid}>
          <div className={`${styles.setCol} ${styles.setNow}`}>
            <h3><span className={styles.badgeNow}>NOW</span> 지금 없으면 불편해요</h3>
            <ul>{ESSENTIALS.now.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className={`${styles.setCol} ${styles.setLater}`}>
            <h3><span className={styles.badgeLater}>LATER</span> 급하지 않아요</h3>
            <ul>{ESSENTIALS.later.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
        <button className={styles.primary} onClick={() => askBot('내 상황에 맞춰 자취 첫주 필수템 리스트를 만들어줘. 예산도 물어봐줘.')}>
          내 리스트 만들기 →
        </button>
      </section>

      {/* 구독 다이어트 */}
      <section id="diet" className={styles.diet}>
        <SecHead k="MATCH 2 / 구독 다이어트" title="새는 구독료, 5스텝으로 정리" />
        <div className={styles.dietSteps}>
          {SUB_DIET.map((s) => (
            <div key={s.n} className={styles.dietStep}>
              <span className={styles.dietNo}>{s.n}</span>
              <b>{s.t}</b>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <button className={styles.primaryAlt} onClick={() => askBot('매달 나가는 구독이 너무 많은 것 같아요. 어떻게 점검하고 줄일지 순서대로 코치해줘.')}>
          구독 정리 코칭받기 →
        </button>
      </section>

      {/* 오늘의 서브 */}
      <section id="serve" className={styles.serve}>
        <SecHead k="TODAY'S SERVE / 주간 팁" title="오늘의 서브" />
        <div className={styles.serveGrid}>
          {SERVES.map((s) => (
            <button key={s.t} className={styles.serveCard} onClick={() => askBot(`"${s.t}" — 이거 자취생 입장에서 왜 좋은지, 어떻게 하는지 구체적으로 코치해줘.`)}>
              <span className={styles.serveIcon}>🎾</span>
              <b>{s.t}</b>
              <p>{s.d}</p>
            </button>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footBrand}>🎾 나달 · 자취 코치</div>
        <p>1인 매치 자취 코치 봇 · 박시영 (미래융합대학 바이오식의약/경영)</p>
        <p className={styles.footFine}>
          나달은 재무설계사·부동산 전문가가 아닙니다. 계약·보증금 등 큰 결정은 공식 창구와 확인하고, 특정 상품 가입은 권유하지 않아요.
        </p>
        <p className={`${styles.footTeam} mono`}>2026 비즈니스모델개발 경진대회 · TEAM 07</p>
      </footer>

      <TutorBotWidget />
    </div>
  )
}

function SecHead({ k, title }) {
  return (
    <div className={styles.secHead}>
      <span className={`${styles.secKicker} mono`}>{k}</span>
      <h2 className={styles.secTitle}>{title}</h2>
    </div>
  )
}
