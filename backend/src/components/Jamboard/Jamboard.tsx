import { JamboardPermissionManager } from './JamboardPermissions';

interface JamboardProps {
  userId: string;
  isHost: boolean;
}

const Jamboard: React.FC<JamboardProps> = ({ userId, isHost }) => {
  const [permissionManager] = useState(new JamboardPermissionManager());
  
  // ... existing code ...

  const handleDraw = (event: any) => {
    if (!permissionManager.isUserAllowedToEdit(userId)) {
      toast.error('You do not have permission to edit the board');
      return;
    }
    // existing drawing logic
  }

  return (
    <div className="jamboard-container">
      <canvas ref={canvasRef} />
      
      {isHost && (
        <div className="permission-controls">
          <button onClick={() => handlePermissionToggle()}>
            Toggle Editing Permissions
          </button>
        </div>
      )}

      <div className="sidebar">
        <NotesSection />
        {isPremiumUser && <ChatBox />}
      </div>
    </div>
  );
};