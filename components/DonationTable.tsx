import React from 'react'

function DonationTable() {
  return (
    <table>
      <caption className="h-[2.5rem] bg-spec-banana border-4 border-spec-white rounded-tr-3xl rounded-tl-3xl text-xl font-bold py-2 text-center lg:px-4 xl:mx-14 2xl:px-20">
        How your donation can make an <strong>impact</strong>!
      </caption>
      <tbody>
        <tr className="bg-spec-lemon border-4 border-spec-white font-montserrat">
          <th scope="row" className="text-center font-normal pl-6 px-2 py-2">
            $20
          </th>
          <td className="pl-6 px-2 py-2">
            Cover a tool or learning resource
          </td>
        </tr>
        <tr className="bg-spec-banana border-4 border-spec-white font-montserrat">
          <th scope="row" className="text-center font-normal pl-6 px-2 py-2">
            $500
          </th>
          <td className="pl-6 px-2 py-2">
            Career development stipend
          </td>
        </tr>
        <tr className="bg-spec-lemon border-4 border-spec-white font-montserrat">
          <th scope="row" className="text-center font-normal pl-6 px-2 py-2">
            $2000
          </th>
          <td className="pl-6 px-2 py-2">
            Fund a short fellowship
          </td>
        </tr>
        <tr className="bg-spec-banana border-4 border-spec-white font-montserrat">
          <th scope="row" className="text-center font-normal pl-6 px-2 py-2">
            $5,000
          </th>
          <td className="pl-6 px-2 py-2">
            Create a community project
          </td>
        </tr>
        <tr className="bg-spec-lemon border-4 border-spec-white font-montserrat">
          <th scope="row" className="text-center font-normal pl-6 px-2 py-2 rounded-bl-3xl">
            $10,000
          </th>
          <td className="pl-6 px-2 py-2 rounded-br-3xl">
            Develop a long-term project
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default DonationTable