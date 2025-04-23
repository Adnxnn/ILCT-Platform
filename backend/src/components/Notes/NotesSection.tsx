interface Note {
  id: string;
  content: string;
  fileUrl?: string;
  fileName?: string;
}

const NotesSection: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      // Upload logic here
    }
  };

  const handleDownloadNote = (note: Note) => {
    if (note.fileUrl) {
      const link = document.createElement('a');
      link.href = note.fileUrl;
      link.download = note.fileName || 'note';
      link.click();
    }
  };

  return (
    <div className="notes-section">
      <h3>Notes</h3>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <p>{note.content}</p>
            {note.fileUrl && (
              <button onClick={() => handleDownloadNote(note)}>
                Download {note.fileName}
              </button>
            )}
          </div>
        ))}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current?.click()}>
        Upload Note File
      </button>
    </div>
  );
};