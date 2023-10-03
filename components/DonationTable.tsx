import React from 'react'
import { tableContents } from '../constants/table-of-contents'

function DonationTable() {
  return (
    <table className="hidden md:block font-montserrat w-full table-auto border-collapse border-spacing-y-6 text-lg text-left">
      <thead>
        <tr>
          <th
            className="h-[2.5rem] bg-spec-banana border-4 border-spec-white rounded-tr-3xl rounded-tl-3xl font-normal py-2 text-sm text-center"
            colSpan={2}
          >
            How your donation can make an <strong>impact</strong>!
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-spec-lemon border-4 border-spec-white">
          <td className="px-2 py-2">
            $20
          </td>
          <td className="px-2 py-2">
            Cover a learning resource
          </td>
        </tr>
        <tr className="bg-spec-banana border-4 border-spec-white">
          <td className="px-2 py-2">
            $500
          </td>
          <td className="px-2 py-2">
            Career development stipend
          </td>
        </tr>
        <tr className="bg-spec-lemon border-4 border-spec-white">
          <td className="px-2 py-2">
            $2000
          </td>
          <td className="px-2 py-2">
            Fund a short fellowship
          </td>
        </tr>
        <tr className="bg-spec-banana border-4 border-spec-white">
          <td className="px-2 py-2">
            $5,000
          </td>
          <td className="px-2 py-2">
            Create a community project
          </td>
        </tr>
        <tr className="bg-spec-lemon border-4 border-spec-white">
          <td className="px-2 py-2 rounded-bl-3xl">
            $10,000
          </td>
          <td className="px-2 py-2 rounded-br-3xl">
            Develop a long-term project
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default DonationTable