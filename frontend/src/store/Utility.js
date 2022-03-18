export default function UpdateStatus(oldStatus, newStatus) {
    return {
        ...oldStatus,
        ...newStatus
    }
} 