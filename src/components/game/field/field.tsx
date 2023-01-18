import './field.css';
import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../../constants/store';

interface PropTypes {
}

export const getPixelFromYard = (yard: number, yardToPixelRatio: number): number => {
    return yard * yardToPixelRatio;
}

export const getYardNumber = (yard: number): number => {
    return (yard < 50) ? yard : 100 - yard;
}

export const FieldPanel = (props: PropTypes) => {

    const firstDownYard = useSelector((state: RootState) => state.firstDownYard);
    let currentYard = useSelector((state: RootState) => state.currentYard);

    const sideLineWidth = 4;
    const ratio = (53 + 1 / 3) / 120;
    const topMargin = 40;
    const leftMargin = 20;
    const totalWidth = 1600;
    const totalHeight = (1600 * ratio) + topMargin;
    const width = totalWidth - (2 * leftMargin);
    const height = width * ratio;
    const yardToPixelRatio = width / 120;

    console.log("totalHeight: " + totalHeight);
    console.log("height: " + height);
    console.log("width: " + width);
    console.log("yardtoPixelRation: " + yardToPixelRatio);

    const canvasRef = React.createRef<HTMLCanvasElement>();

    React.useEffect(() => {
        if (canvasRef.current) {
            const canvas: HTMLCanvasElement = canvasRef.current;
            const context: any | null = canvas ? canvas.getContext('2d') : null;
            if (context !== null) {
                context.fillStyle = 'green';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.stroke();

                //draw field outline
                context.strokeStyle = 'white';
                context.lineWidth = sideLineWidth;
                context.rect(leftMargin, topMargin, width, height);
                context.stroke();

                const topSideLine = topMargin;
                const bottomSideLine = topSideLine + height;
                const hashMarkHeight = getPixelFromYard(2 / 3, yardToPixelRatio);
                const insideHashMarkOffset = getPixelFromYard(20, yardToPixelRatio);
                const yardNumberOffset = getPixelFromYard(7, yardToPixelRatio);

                for (let i = 0; i < 101; ++i) {
                    let x = getPixelFromYard(i + 10, yardToPixelRatio) + leftMargin;

                    console.log('i: ' + i + ' x: ' + x);
                    context.beginPath();

                    if (i % 100 === 0) {
                        context.strokeStyle = 'white';
                        context.lineWidth = 2;
                        context.moveTo(x, topSideLine)
                        context.lineTo(x, bottomSideLine);
                        context.stroke();
                    } else if (i % 10 === 0) {
                        context.strokeStyle = 'white';
                        context.lineWidth = 3;
                        context.moveTo(x, topSideLine)
                        context.lineTo(x, bottomSideLine);
                        context.stroke();

                        if (i < 50) {
                            let region = new Path2D();
                            region.moveTo(x - 30, bottomSideLine - yardNumberOffset - 5);
                            region.lineTo(x - 30, bottomSideLine - yardNumberOffset - 16);
                            region.lineTo(x - 39, bottomSideLine - yardNumberOffset - 11);
                            region.lineTo(x - 30, bottomSideLine - yardNumberOffset - 6);
                            context.fillStyle = 'white';
                            context.fill(region, "evenodd");

                            region = new Path2D();
                            region.moveTo(x - 30, topSideLine + yardNumberOffset + 5);
                            region.lineTo(x - 30, topSideLine + yardNumberOffset + 16);
                            region.lineTo(x - 39, topSideLine + yardNumberOffset + 11);
                            region.lineTo(x - 30, topSideLine + yardNumberOffset + 6);
                            context.fillStyle = 'white';
                            context.fill(region, "evenodd");
                        } else if (i > 50) {
                            let region = new Path2D();
                            region.moveTo(x + 30, bottomSideLine - yardNumberOffset - 5);
                            region.lineTo(x + 30, bottomSideLine - yardNumberOffset - 16);
                            region.lineTo(x + 39, bottomSideLine - yardNumberOffset - 11);
                            region.lineTo(x + 30, bottomSideLine - yardNumberOffset - 6);
                            context.fillStyle = 'white';
                            context.fill(region, "evenodd");

                            region = new Path2D();
                            region.moveTo(x + 30, topSideLine + yardNumberOffset + 5);
                            region.lineTo(x + 30, topSideLine + yardNumberOffset + 16);
                            region.lineTo(x + 39, topSideLine + yardNumberOffset + 11);
                            region.lineTo(x + 30, topSideLine + yardNumberOffset + 6);
                            context.fillStyle = 'white';
                            context.fill(region, "evenodd");
                        }
                    } else if (i % 5 === 0) {
                        context.strokeStyle = 'white';
                        context.lineWidth = 1;
                        context.moveTo(x, topSideLine)
                        context.lineTo(x, bottomSideLine);
                        context.stroke();
                    } else {
                        context.lineWidth = 1;
                        context.strokeStyle = 'white';
                        context.moveTo(x, topSideLine + sideLineWidth)
                        context.lineTo(x, topSideLine + sideLineWidth + hashMarkHeight);
                        context.stroke();
                        context.lineWidth = 1;
                        context.moveTo(x, bottomSideLine - sideLineWidth)
                        context.lineTo(x, bottomSideLine - sideLineWidth - hashMarkHeight);
                        context.stroke();

                        context.lineWidth = 1;
                        context.strokeStyle = 'white';
                        context.moveTo(x, topSideLine + sideLineWidth + insideHashMarkOffset)
                        context.lineTo(x, topSideLine + sideLineWidth + hashMarkHeight + insideHashMarkOffset);
                        context.stroke();
                        context.lineWidth = 1;
                        context.moveTo(x, bottomSideLine - sideLineWidth - insideHashMarkOffset)
                        context.lineTo(x, bottomSideLine - sideLineWidth - hashMarkHeight - insideHashMarkOffset);
                        context.stroke();
                    }
                }

                //draw bottom yard numbers;
                for (let i = 10; i < 100; i += 10) {
                    let x = getPixelFromYard(i + 10, yardToPixelRatio) + leftMargin;

                    console.log('i: ' + i + ' x: ' + x);
                    context.beginPath();

                    context.font = "30px Arial";
                    context.textAlign = 'center';
                    context.letterSpacing = '12px';
                    context.strokeText(getYardNumber(i), x + 5, bottomSideLine - yardNumberOffset);
                    context.stroke();
                }


                //todo: need to figure out these offsets;  why 535 and 205?
                //draw top yard numbers;
                context.save();
                context.translate(totalWidth / 2, totalHeight / 2);
                context.rotate(-1.0 * Math.PI);
                for (let i = 10; i < 100; i += 10) {
                    let x = getPixelFromYard(i - 10, yardToPixelRatio) + leftMargin;

                    console.log('i: ' + i + ' x: ' + x);
                    context.beginPath();

                    context.font = "30px Arial";
                    context.textAlign = 'center';
                    context.letterSpacing = '12px';
                    context.strokeText(getYardNumber(i), x - 535, topSideLine + 205);
                    context.stroke();
                }
                context.restore();

                let yardMarkerOffset = 0;

                if (Math.abs(firstDownYard - currentYard) < 3) {
                    yardMarkerOffset = (firstDownYard < currentYard) ? -3 : 3;
                }

                //draw line of scrimmage
                context.beginPath();

                let x = getPixelFromYard(currentYard + 10, yardToPixelRatio) + leftMargin;
                context.strokeStyle = 'black';
                context.lineWidth = 2;
                context.moveTo(x, topSideLine + 2)
                context.lineTo(x, bottomSideLine - 2);
                context.stroke();

                if (Math.abs(firstDownYard - currentYard) < 2) {
                    yardMarkerOffset = (firstDownYard < currentYard) ? 8 : -8;
                }

                context.font = "20px Arial";
                context.textAlign = 'center';
                context.letterSpacing = '2px';
                context.strokeText(getYardNumber(currentYard), x + yardMarkerOffset, topSideLine - 6);
                context.stroke();

                //draw firstDownMarker
                context.beginPath();

                x = getPixelFromYard(firstDownYard + 10, yardToPixelRatio) + leftMargin;
                context.strokeStyle = 'yellow';
                context.lineWidth = 2;
                context.moveTo(x, topSideLine + 2)
                context.lineTo(x, bottomSideLine - 2);
                context.stroke();

                if (Math.abs(firstDownYard - currentYard) < 3) {
                    yardMarkerOffset = (firstDownYard < currentYard) ? -8 : 8;
                }

                context.font = "20px Arial";
                context.textAlign = 'center';
                context.letterSpacing = '2px';
                context.strokeText(getYardNumber(firstDownYard), x + yardMarkerOffset, topSideLine - 6);
                context.stroke();

                //draw football
                const footballRadius = 10;
                const centerOfField = height / 2 + topMargin;
                x = getPixelFromYard(currentYard + 10, yardToPixelRatio) + leftMargin;
                context.beginPath();
                context.strokeStyle = 'brown';
                context.moveTo(x - footballRadius, centerOfField);
                context.quadraticCurveTo(x, centerOfField + 8, x + footballRadius, centerOfField);
                context.moveTo(x + footballRadius, centerOfField);
                context.quadraticCurveTo(x, centerOfField - 8, x - footballRadius, centerOfField);
                context.fillStyle = "brown";
                context.fill();
                context.stroke();
            }
        }
    }, []);

    return (
        <div className="field">
            <canvas ref={canvasRef} className="field-canvas" width={totalWidth} height={totalHeight}></canvas>
        </div>
    );
}