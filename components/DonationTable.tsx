
import React from 'react'
import { tableContents } from '../constants/table-of-contents'


function DonationTable() {
  return (
      <div>
          <table className="montserrat h-[14rem] w-full table-auto border-collapse border-spacing-y-6  text-xs">
												<thead>
													<tr className="">
														{/* h-[2.5rem] rounded-tr-3xl rounded-tl-3xl border bg-spec-banana font-normal */}
														<th
															className="rounded-tr-3xl rounded-tl-3xl bg-spec-banana font-normal py-4 text-sm"
															colSpan={2}>
															The <strong>impact</strong> of your donation makes
														</th>
													</tr>
												</thead>
												<tbody className="my-2 space-y-2 ">
													{tableContents.map((row, index) => {
														const isEvenRow = index % 2 === 0;
														const rowColor = isEvenRow
															? "bg-spec-lemon"
															: "bg-spec-banana";
														const isLastRow =
															index === tableContents.length - 1;
														return (
															<tr
																key={index}
																className={`${rowColor}  border-spec-white`}>
																{row.map((cell, cellIndex) => (
																	<td
																		key={cellIndex}
																		className={`px-4 ${
																			isLastRow && cellIndex
																				? "rounded-br-3xl"
																				: ""
																		} ${
																			cellIndex === 0 && isLastRow
																				? "rounded-bl-3xl"
																				: ""
																		} ${cellIndex ? "text-right" : ""}`}>
																		{cell}
																	</td>
																))}
															</tr>
														);
													})}
												</tbody>
											</table>
          
    </div>
  )
}

export default DonationTable