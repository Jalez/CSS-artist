/** @format */

import { useEffect, useRef } from 'react';
import { domToPng } from 'modern-screenshot';

interface ConditionalScreenshotProps {
	screenshotName: string;
	triggerCondition: string;
	children: React.ReactNode;
	updateScreenshot: (screenshotName: string, dataUrl: string) => void;
}

/**
 * @description This component takes a screenshot of its children and passes the screenshot to the updateScreenshot function
 * @param param0
 * @returns
 */
export const ScreenShotter = ({
	screenshotName,
	triggerCondition,
	children,
	updateScreenshot,
}: ConditionalScreenshotProps) => {
	const screenshotRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!screenshotRef.current) return;
		domToPng(screenshotRef.current).then((dataUrl: string) => {
			updateScreenshot(screenshotName, dataUrl);
		});
	}, [triggerCondition]);

	return <div ref={screenshotRef}>{children}</div>;
};
