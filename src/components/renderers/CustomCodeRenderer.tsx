'use client'

function CustomCodeRenderer({ data }: any) {
	data

	return (
		<pre className="bg-gray-800 rounded-md p-4 overflow-hidden ">
			<code className="text-gray-100 text-sm  whitespace-break-spaces w-full block">
				{data.code}
			</code>
		</pre>
	)
}

export default CustomCodeRenderer
