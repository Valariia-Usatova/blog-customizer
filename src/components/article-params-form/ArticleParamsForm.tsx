import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useState, SyntheticEvent, useEffect, useRef } from 'react';

interface ArticleParamsFormProps {
	onApplySettings: (settings: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidth: string;
	}) => void;
}

export const ArticleParamsForm = ({
	onApplySettings,
}: ArticleParamsFormProps) => {
	const [articleFont, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [articleFontSize, setFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [articleFontColor, setFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [articleBackgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [articleContentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	const handleArrowClick = () => {
		setIsAsideOpen(!isAsideOpen);
	};

	function handleSaveSubmit(e: SyntheticEvent) {
		e.preventDefault();
		onApplySettings({
			fontFamily: articleFont.value,
			fontSize: articleFontSize.value,
			fontColor: articleFontColor.value,
			backgroundColor: articleBackgroundColor.value,
			contentWidth: articleContentWidth.value,
		});
	}

	function handleResetSubmit() {
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		onApplySettings({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
			setIsAsideOpen(false);
		}
	};

	useEffect(() => {
		if (isAsideOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isAsideOpen]);

	return (
		<>
			<ArrowButton isOpen={isAsideOpen} onClick={handleArrowClick} />
			<aside
				ref={asideRef}
				className={`${styles.container} ${
					isAsideOpen && styles.container_open
				}`}>
				<form className={styles.form} onSubmit={handleSaveSubmit}>
					<Text as={'h1'} weight={800} size={31} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={articleFont}
						onChange={(selected) => setFont(selected)}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={articleFontSize}
						onChange={(selected) => setFontSize(selected)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={articleFontColor}
						onChange={(selected) => setFontColor(selected)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={articleBackgroundColor}
						onChange={(selected) => setBackgroundColor(selected)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={articleContentWidth}
						onChange={(selected) => setContentWidth(selected)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetSubmit}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
