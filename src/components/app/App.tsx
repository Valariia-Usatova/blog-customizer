import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../../components/article/Article';
import { ArticleParamsForm } from '../../components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [settings, setSettings] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamily,
					'--font-size': settings.fontSize,
					'--font-color': settings.fontColor,
					'--container-width': settings.contentWidth,
					'--bg-color': settings.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onApplySettings={setSettings} />
			<Article />
		</main>
	);
};
