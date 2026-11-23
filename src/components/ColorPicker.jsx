const colors = [
  { name: 'Yellow', value: '#fef3c7' },
  { name: 'Green', value: '#dcfce7' },
  { name: 'Blue', value: '#dbeafe' },
  { name: 'Pink', value: '#fce7f3' },
  { name: 'Purple', value: '#ede9fe' },
  { name: 'White', value: '#ffffff' },
]

function ColorPicker({ selectedColor, onColorChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <button
          key={color.value}
          type="button"
          onClick={() => onColorChange(color.value)}
          title={color.name}
          aria-label={`Select ${color.name}`}
          aria-pressed={selectedColor === color.value}
          className={`w-8 h-8 rounded-full border-2 transition ${
            selectedColor === color.value
              ? 'border-gray-800 scale-110'
              : 'border-gray-300 hover:scale-110'
          }`}
          style={{ backgroundColor: color.value }}
        />
      ))}
    </div>
  )
}

export default ColorPicker