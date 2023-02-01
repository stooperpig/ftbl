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
    const scale = (totalWidth / 1600);
    const totalHeight = (totalWidth * ratio) + topMargin;
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
                        context.lineWidth = (2 * scale);
                        context.moveTo(x, topSideLine)
                        context.lineTo(x, bottomSideLine);
                        context.stroke();
                    } else if (i % 10 === 0) {
                        context.strokeStyle = 'white';
                        context.lineWidth = (3 * scale);
                        context.moveTo(x, topSideLine)
                        context.lineTo(x, bottomSideLine);
                        context.stroke();

                        if (i < 50) {
                            let region = new Path2D();
                            region.moveTo(x - (30 * scale), bottomSideLine - yardNumberOffset - (5 * scale));
                            region.lineTo(x - (30 * scale), bottomSideLine - yardNumberOffset - (16 * scale));
                            region.lineTo(x - (39 * scale), bottomSideLine - yardNumberOffset - (11 * scale));
                            region.lineTo(x - (30 * scale), bottomSideLine - yardNumberOffset - (6 * scale));
                            context.fillStyle = 'white';
                            context.fill(region, "evenodd");

                            region = new Path2D();
                            region.moveTo(x - (30 * scale), topSideLine + yardNumberOffset + (5 * scale));
                            region.lineTo(x - (30 * scale), topSideLine + yardNumberOffset + (16 * scale));
                            region.lineTo(x - (39 * scale), topSideLine + yardNumberOffset + (11 * scale));
                            region.lineTo(x - (30 * scale), topSideLine + yardNumberOffset + (6 * scale));
                            context.fillStyle = 'white';
                            context.fill(region, "evenodd");
                        } else if (i > 50) {
                            let region = new Path2D();
                            region.moveTo(x + (30 * scale), bottomSideLine - yardNumberOffset - (5 * scale));
                            region.lineTo(x + (30 * scale), bottomSideLine - yardNumberOffset - (16 * scale));
                            region.lineTo(x + (39 * scale), bottomSideLine - yardNumberOffset - (11 * scale));
                            region.lineTo(x + (30 * scale), bottomSideLine - yardNumberOffset - (6 * scale));
                            context.fillStyle = 'white';
                            context.fill(region, "evenodd");

                            region = new Path2D();
                            region.moveTo(x + (30 * scale), topSideLine + yardNumberOffset + (5 * scale));
                            region.lineTo(x + (30 * scale), topSideLine + yardNumberOffset + (16 * scale));
                            region.lineTo(x + (39 * scale), topSideLine + yardNumberOffset + (11 * scale));
                            region.lineTo(x + (30 * scale), topSideLine + yardNumberOffset + (6 * scale));
                            context.fillStyle = 'white';
                            context.fill(region, "evenodd");
                        }
                    } else if (i % 5 === 0) {
                        context.strokeStyle = 'white';
                        context.lineWidth = (1 * scale);
                        context.moveTo(x, topSideLine)
                        context.lineTo(x, bottomSideLine);
                        context.stroke();
                    } else {
                        context.lineWidth = (1 * scale);
                        context.strokeStyle = 'white';
                        context.moveTo(x, topSideLine + sideLineWidth)
                        context.lineTo(x, topSideLine + sideLineWidth + hashMarkHeight);
                        context.stroke();
                        context.lineWidth = (1 * scale);
                        context.moveTo(x, bottomSideLine - sideLineWidth)
                        context.lineTo(x, bottomSideLine - sideLineWidth - hashMarkHeight);
                        context.stroke();

                        context.lineWidth = (1 * scale);
                        context.strokeStyle = 'white';
                        context.moveTo(x, topSideLine + sideLineWidth + insideHashMarkOffset)
                        context.lineTo(x, topSideLine + sideLineWidth + hashMarkHeight + insideHashMarkOffset);
                        context.stroke();
                        context.lineWidth = (1 * scale);
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

                    context.font = `${30 * scale}px Arial`;;
                    context.textAlign = 'center';
                    context.letterSpacing = `${12 * scale}px`;
                    context.strokeText(getYardNumber(i), x + (5 * scale), bottomSideLine - yardNumberOffset);
                    context.stroke();
                }

                //draw top yard numbers;
                console.log("canvas width: " + canvas.width);
                console.log("canvas height: " + canvas.height);
                console.log("totalWidth: " + totalWidth);
                console.log("totalHeight: " + totalHeight);

                context.save();
                context.translate(totalWidth / 2, totalHeight / 2);
                context.rotate(-1.0 * Math.PI);
                context.translate(-totalWidth / 2, -totalHeight / 2);
                for (let i = 10; i < 100; i += 10) {
                    let x = getPixelFromYard(i + 10, yardToPixelRatio) + leftMargin;

                    console.log('i: ' + i + ' x: ' + x);
                    context.beginPath();

                    context.font = `${30 * scale}px Arial`;
                    context.textAlign = 'center';
                    context.letterSpacing = `${12 * scale}px`;
                    context.strokeText(getYardNumber(i), x + (5 * scale), bottomSideLine - yardNumberOffset - 23);
                    context.stroke();
                }
                context.restore();

                let yardMarkerOffset = 0;

                if (Math.abs(firstDownYard - currentYard) < 3) {
                    yardMarkerOffset = (firstDownYard < currentYard) ? (-3 * scale) : (3 * scale);
                }

                //draw line of scrimmage
                context.beginPath();

                let x = getPixelFromYard(currentYard + 10, yardToPixelRatio) + leftMargin;
                context.strokeStyle = 'black';
                context.lineWidth = (2 * scale);
                context.moveTo(x, topSideLine + (2 * scale))
                context.lineTo(x, bottomSideLine - (2 * scale));
                context.stroke();

                if (Math.abs(firstDownYard - currentYard) < 2) {
                    yardMarkerOffset = (firstDownYard < currentYard) ? (8 * scale) : (-8 * scale);
                }

                context.font = `${20 * scale}px Arial`;
                context.textAlign = 'center';
                context.letterSpacing = '2px';
                context.strokeText(getYardNumber(currentYard), x + yardMarkerOffset, topSideLine - (6 * scale));
                context.stroke();

                //draw firstDownMarker
                context.beginPath();

                x = getPixelFromYard(firstDownYard + 10, yardToPixelRatio) + leftMargin;
                context.strokeStyle = 'yellow';
                context.lineWidth = (2 * scale);
                context.moveTo(x, topSideLine + (2 * scale))
                context.lineTo(x, bottomSideLine - (2 * scale));
                context.stroke();

                if (Math.abs(firstDownYard - currentYard) < 3) {
                    yardMarkerOffset = (firstDownYard < currentYard) ? (-8 * scale) : (8 * scale);
                }

                context.font = `${20 * scale}px Arial`;
                context.textAlign = 'center';
                context.letterSpacing = '2px';
                context.strokeText(getYardNumber(firstDownYard), x + yardMarkerOffset, topSideLine - (6 * scale));
                context.stroke();

                //draw football
                const footballRadius = (10 * scale);
                const centerOfField = height / 2 + topMargin;
                x = getPixelFromYard(currentYard + 10, yardToPixelRatio) + leftMargin;
                context.beginPath();
                context.strokeStyle = 'brown';
                context.moveTo(x - footballRadius, centerOfField);
                context.quadraticCurveTo(x, centerOfField + (8 * scale), x + footballRadius, centerOfField);
                context.moveTo(x + footballRadius, centerOfField);
                context.quadraticCurveTo(x, centerOfField - (8 * scale), x - footballRadius, centerOfField);
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