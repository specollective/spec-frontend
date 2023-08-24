
import React from 'react'
import { tableContents } from './constants/TableContents'


function DonationTable() {
  return (
      <div>
				<table className="font-montserrat h-72 w-full table-auto border-collapse border-spacing-y-6 text-xs">
					<thead>
						<tr className="">
							<th
								className="h-[2.5rem] rounded-tr-3xl rounded-tl-3xl bg-spec-banana font-normal py-4 text-sm"
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
									className={`${rowColor} border-4 border-spec-white`}>
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
											}
											${cellIndex ? "text-right" : ""}`}>
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