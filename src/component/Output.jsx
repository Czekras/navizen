import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Output({ func, data }) {
  const removeList = ['sitemap'];

  return (
    <section className="output cmn-py">
      <div className="output__wrapper">
        <input
          type="checkbox"
          name="collapse"
          id={`${data.title}_handle`}
          checked={data.toggle}
          onChange={func.handleCollapseToggle}
        />
        <header className="output__header">
          <label className="output__label" htmlFor={`${data.title}_handle`}>
            <h2 className="output__title">{data.title}</h2>
            <span className="output__icon material-symbols-outlined">
              {data.toggle ? 'expand_less' : 'expand_more'}
            </span>
          </label>
        </header>
        <div className="output__setting">
          <form
            className="input__form input__form--setting"
            id={`${data.title}_reset`}
            onSubmit={func.handleResetName}
          >
            <div className="input__form-item">
              <label htmlFor={`${data.title}Item`}>&lt;li&gt;クラス名</label>
              <input
                type="text"
                id={`${data.title}_item`}
                placeholder={data.item}
                value={data.item}
                onChange={func.handleChangeName}
              />
            </div>
            <div className="input__form-item">
              <label htmlFor={`${data.title}Link`}>&lt;a&gt;クラス名</label>
              <input
                type="text"
                id={`${data.title}_link`}
                placeholder={data.link}
                value={data.link}
                onChange={func.handleChangeName}
              />
            </div>
            <div className="input__form-item">
              <label htmlFor={`${data.title}Acts`}>Activeクラス名</label>
              <input
                type="text"
                id={`${data.title}_acts`}
                placeholder={data.acts}
                value={data.acts}
                disabled={data.active}
                onChange={func.handleChangeName}
              />
            </div>
            <div className="input__form-item">
              {/* <button className="input__icon" disabled={!data.nameChange}> */}
              <button className="input__icon" disabled={false}>
                <span className="material-symbols-outlined">restart_alt</span>
              </button>
            </div>
          </form>
        </div>
        <ul className="output__list">
          {/* {data.masterList.map((item, index) => { */}
          {data.mainList.map((item, index) => {
            let itemHref = item.slug ? `/${item.slug}/` : '';
            const itemItem = data.item ? ` class="${data.item}` : '';
            const itemLink = data.link ? `${data.link}` : '';
            const itemActs = data.acts
              ? `<?php if (get_meta('slug') == '${item.slug}') echo '${data.acts}'?>`
              : '';
            let itemSet =
              itemLink || itemActs
                ? ` class="${[itemLink, itemActs].filter((x) => x).join(' ')}"`
                : '';

            if (data.sougou) {
              if (index == 0) itemHref = '/';
              if (index == 1) itemHref = `/${item.slug}/`;
            } else {
              if (index == 0) return;
              if (index == 1) itemHref = '/';
            }

            if (removeList.indexOf(data.title) > -1 && !data.active) {
              itemSet = ` class="${itemLink}"`;
            }

            return (
              // <li key={index}>{item.id}, {item.slug}</li>
              <li className="output__item" key={item.id}>
                &lt;li{itemItem}&gt;&lt;a{itemSet} href="{itemHref}"&gt;
                {item.name}
                &lt;/a&gt;&lt;/li&gt;
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
