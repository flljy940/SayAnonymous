import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  View,
  TouchableOpacity,
  } from 'react-native';

export default function Topic(props) {
  return (
    <>
      <div className="div">
        <TouchableOpacity>
        <img
          loading="lazy"
          src={props.file}
          className="img"
        />
        </TouchableOpacity>
        <TouchableOpacity className="div-2">
          <div className="div-3">{props.name}</div>
          <div className="div-4">{props.num} members</div>
        </TouchableOpacity>
      </div>
      <style jsx>{`
        .div {
          border-radius: 8px;
          display: flex;
          margin-top: 8px;
          gap: 16px;
          white-space: nowrap;
          padding: 12px 0;
        }
        @media (max-width: 991px) {
          .div {
            white-space: initial;
          }
        }
        .img {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 48px;
        }
        .div-2 {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        @media (max-width: 991px) {
          .div-2 {
            white-space: initial;
          }
        }
        .div-3 {
          color: #000;
          font-family: Inter, sans-serif;
          font-weight: 500;
        }
        .div-4 {
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          color: #454545;
          text-overflow: ellipsis;
          font-family: Inter, sans-serif;
          font-weight: 400;
        }
      `}</style>
    </>
  );
}