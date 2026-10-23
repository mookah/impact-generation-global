import { useId } from 'react';
import styles from './ImpactBuddy.module.css';
export default function ImpactBuddy({small=false,variant='cycling'}:{small?:boolean;variant?:'welcome'|'cycling'}){
  const gradient=useId();const cycling=variant==='cycling';
  return <svg viewBox={cycling?'0 0 190 210':'0 0 160 190'} width={small?48:110} height={small?57:130} className={styles.buddy} aria-hidden="true" focusable="false">
    <defs><linearGradient id={gradient} x2="1" y2="1"><stop stopColor="#2874b2"/><stop offset="1" stopColor="#123f78"/></linearGradient></defs>
    <ellipse cx={cycling?95:80} cy={cycling?203:181} rx={cycling?70:34} ry="5" fill="#0c3553" opacity=".12" className={styles.shadow}/>
    <g className={styles.float}>
      {cycling&&<g>{[40,148].map(x=><g key={x}><circle cx={x} cy="171" r="28" fill="#e8f1f8" stroke="#163957" strokeWidth="6"/><g className={styles.wheel}><path d={`M${x-24} 171H${x+24}M${x} 147V195M${x-17} 154L${x+17} 188M${x-17} 188L${x+17} 154`} stroke="#9bb2c7" strokeWidth="1.5"/></g><circle cx={x} cy="171" r="4" fill="#e4b446"/></g>)}<path d="M40 171L73 133L94 171L40 171M73 133L132 132L94 171M132 122L148 171" fill="none" stroke="#e7bb51" strokeWidth="6" strokeLinejoin="round"/><path d="M132 132L130 121L142 117M73 133L70 125" fill="none" stroke="#173e61" strokeWidth="4" strokeLinecap="round"/><path d="M61 125H83" stroke="#173e61" strokeWidth="7" strokeLinecap="round"/></g>}
      <g transform={cycling?'translate(18 -4) scale(.8)':undefined}>
      {!cycling&&<path d="M53 159L47 175Q55 183 70 176L74 158M89 159L90 176Q109 183 115 175L108 158" fill="#103456"/>}
      <path d="M49 104Q80 89 111 104L120 159Q80 176 40 159Z" fill={`url(#${gradient})`} stroke="#0b3459" strokeWidth="2"/>
      <path d="M78 102H85L87 163H77Z" fill="#efc65d"/><path d="M45 153Q80 166 116 153" fill="none" stroke="#f1cb67" strokeWidth="6"/>
      <path d={cycling?'M49 109Q67 138 127 151':'M49 109Q28 121 31 145'} fill="none" stroke="#2373ae" strokeWidth="17" strokeLinecap="round"/><circle cx={cycling?127:31} cy={cycling?151:146} r="9" fill="#c98c62"/>
      {cycling?<g><path d="M111 110Q140 126 140 151" fill="none" stroke="#2373ae" strokeWidth="16" strokeLinecap="round"/><circle cx="140" cy="151" r="9" fill="#d59b6e"/></g>:<g className={styles.wave}><path d="M111 110Q136 99 133 76" fill="none" stroke="#2373ae" strokeWidth="16" strokeLinecap="round"/><path d="M126 80Q121 69 124 65L130 72L129 55Q132 50 135 57L137 69L142 59Q146 57 147 62L142 79Q135 90 126 80" fill="#d59b6e" stroke="#aa6c46" strokeWidth="1.5"/></g>}
      <path d="M48 47Q47 12 80 12Q116 12 115 47L112 82Q105 108 80 108Q51 106 47 80Z" fill="#dba476" stroke="#b77a50" strokeWidth="1.5"/>
      <ellipse cx="46" cy="66" rx="7" ry="10" fill="#dba476"/><ellipse cx="114" cy="66" rx="7" ry="10" fill="#dba476"/>
      <path d="M45 51Q36 14 70 11Q95 -1 113 23Q121 36 114 53L104 37Q82 47 63 33Q58 49 45 51" fill="#302627"/><path d="M52 27Q68 10 92 18" fill="none" stroke="#59403a" strokeWidth="5" strokeLinecap="round"/>
      {cycling&&<g><path d="M39 36Q39 2 79 2Q119 1 122 36L105 42L58 40Z" fill="#f0c85d" stroke="#19466e" strokeWidth="3"/><path d="M65 11L61 30M83 8V29M101 12L106 31" stroke="#19466e" strokeWidth="5" strokeLinecap="round"/><path d="M44 40L54 82M115 42L104 82" stroke="#19466e" strokeWidth="2"/></g>}
      <path d="M56 55Q63 50 70 55M89 55Q96 50 103 55" fill="none" stroke="#50332e" strokeWidth="3" strokeLinecap="round"/>
      <g className={styles.eyes}><ellipse cx="64" cy="66" rx="8" ry="10" fill="white"/><ellipse cx="95" cy="66" rx="8" ry="10" fill="white"/><ellipse cx="65" cy="67" rx="4.8" ry="7" fill="#193550"/><ellipse cx="94" cy="67" rx="4.8" ry="7" fill="#193550"/><circle cx="66" cy="64" r="2" fill="white"/><circle cx="95" cy="64" r="2" fill="white"/></g>
      <ellipse cx="57" cy="80" rx="8" ry="4" fill="#c7735d" opacity=".35"/><ellipse cx="103" cy="80" rx="8" ry="4" fill="#c7735d" opacity=".35"/><path d="M77 72L75 80Q80 83 83 79" fill="none" stroke="#b57a51" strokeWidth="2" strokeLinecap="round"/>
      <path d="M65 86Q79 101 94 86Q81 91 65 86" fill="#713e35"/><path d="M68 87Q80 92 91 87" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="102" cy="127" r="9" fill="#f0cb6a"/><path d="M102 121L104 125L108 126L105 129L105 133L102 131L98 133L99 129L96 126L100 125Z" fill="#164979"/>
      </g>
      {cycling&&<g><path d="M77 125Q109 132 104 146L91 167" stroke="#163f68" strokeWidth="14" fill="none" strokeLinecap="round"/><path d="M68 128L63 152L91 178" stroke="#1e5687" strokeWidth="13" fill="none" strokeLinecap="round"/><path d="M82 170H99M86 180H104" stroke="#102d4a" strokeWidth="7" strokeLinecap="round"/><circle cx="94" cy="171" r="6" fill="#d3a13b"/></g>}
    </g>
  </svg>;
}
