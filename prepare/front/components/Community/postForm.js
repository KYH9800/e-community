import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
// import Link from 'next/link';
import { TextWrapper, ImageWrapper } from '../style/postFormSt';

import { backURL } from '../../config/config';
import CommentForm from './comment';
import { REMOVE_COMMENT_REQUEST } from '../../reducers/post';
import { useCallback } from 'react';

const PostForm = ({ post }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { me } = useSelector((state) => state.user);

  const onRemoveComment = useCallback(
    (comment) => () => {
      // submit 기능이 없어서 기본 새로고침 기능이 없다.
      if (confirm('댓글을 삭제 하시겠습니까? 삭제 후 댓글은 복구되지 않습니다.') == true) {
        dispatch({
          type: REMOVE_COMMENT_REQUEST,
          data: comment.id,
        });
      }
    },
    [],
  );

  const onClickBack = useCallback(() => {
    Router.back();
  });

  return (
    <TextWrapper>
      <table>
        <thead>
          <th className="category">{post.category}</th>
          <th className="title-word">제목</th>
          <th className="title">{post.title}</th>
          <th className="nickname">
            <span>{post.User.nickname}</span>님의 글
          </th>
        </thead>
      </table>
      <div id="content-wrapper">
        <ImageWrapper>
          {post.Images.map((v, i) => (
            <img src={`${backURL}/${v.src}`} />
          ))}
        </ImageWrapper>
        <div>
          {post.content.split('\n').map((line, i) => {
            return <div key={i}>{line}</div>;
          })}
        </div>
      </div>
      <div>
        <button id="turn-back-btn" onClick={onClickBack}>
          목록으로
        </button>
      </div>
      <div id="comment-input">
        <div>{me ? <CommentForm post={post} /> : null}</div>
      </div>
      <div id="comments-btn-wrapper">
        <span>총 댓글 {post.Comments.length}개</span>
      </div>
      <div id="comment-lists-wrapper">
        {post.Comments.map((v, i) => {
          return (
            <div id="comment-lists" key={v.id}>
              <div id="content-comments">
                <div className="comment-user-name">
                  {v.User.nickname}
                  <span id="moment-data">{v.createdAt.substr(0, 10)} 작성됨</span>
                </div>
                <p>
                  {v.content.split('\n').map((line, i) => {
                    return <div key={i}>{line}</div>;
                  })}
                </p>
                {me?.id === v.User.id ? (
                  <button type="button" onClick={onRemoveComment(v)}>
                    삭제
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </TextWrapper>
  );
};

export default PostForm;
