import { db } from "./firebase";
export const getMessagesByRoomId = async (roomId) => {
  try {
    const messagesRef = db.collection("messages");
    const query = messagesRef.where("room_id", "==", roomId);
    const snapshot = await query.get();

    const messages = snapshot.docs.map((doc) => doc.data());
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};
export const firebaseTimestampToHour = (firebaseTimestamp) => {
  const { seconds, nanoseconds } = firebaseTimestamp;
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${hour}:${minute} - ${day}/${month}/${year}`;
};

// Chuyển đổi Firebase Timestamp thành thời gian (Date object)
const timestampToDate = (firebaseTimestamp) => {
  if (!firebaseTimestamp || !firebaseTimestamp.seconds) {
    // Xử lý trường hợp firebaseTimestamp không tồn tại hoặc không hợp lệ
    return null;
  }

  const { seconds, nanoseconds } = firebaseTimestamp;
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  return new Date(milliseconds);
};

// Tính khoảng thời gian (đơn vị là phút) giữa hai thời điểm
export const calculateTimeDifferenceInMinutes = (createdAt) => {
  const createdAtDate = timestampToDate(createdAt);
  if (!createdAtDate) {
    // Xử lý trường hợp createdAt không tồn tại hoặc không hợp lệ
    return 0;
  }

  const now = new Date();
  const timeDifferenceInMillis = now - createdAtDate;
  return Math.floor(timeDifferenceInMillis / (1000 * 60));
};

// Ví dụ sử dụng:

// export const timeDifferenceInMinutes = calculateTimeDifferenceInMinutes(
//   createdAtTimestamp
// );

export const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(" ").filter((word) => word);
  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = "";
    name.split("").forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(" "));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
