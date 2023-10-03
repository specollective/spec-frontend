import React from 'react'

function DonationTable() {
  return (
    <table>
      <thead>
        <tr>
          <th
            colSpan={2}
            className="h-[2.5rem] bg-spec-banana border-4 border-spec-white rounded-tr-3xl rounded-tl-3xl text-xl py-2 text-center lg:px-4 xl:mx-14 2xl:px-20"
          >
            <div>How your donation can make an <strong>impact</strong>!</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-spec-lemon border-4 border-spec-white font-montserrat">
          <td className="px-2 py-2">
            $20
          </td>
          <td className="px-2 py-2">
            Cover a tool or learning resource
          </td>
        </tr>
        <tr className="bg-spec-banana border-4 border-spec-white font-montserrat">
          <td className="px-2 py-2">
            $500
          </td>
          <td className="px-2 py-2">
            Career development stipend
          </td>
        </tr>
        <tr className="bg-spec-lemon border-4 border-spec-white font-montserrat">
          <td className="px-2 py-2">
            $2000
          </td>
          <td className="px-2 py-2">
            Fund a short fellowship
          </td>
        </tr>
        <tr className="bg-spec-banana border-4 border-spec-white font-montserrat">
          <td className="px-2 py-2">
            $5,000
          </td>
          <td className="px-2 py-2">
            Create a community project
          </td>
        </tr>
        <tr className="bg-spec-lemon border-4 border-spec-white font-montserrat">
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