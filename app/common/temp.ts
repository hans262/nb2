// if (search) {
      //   //判断是不是username
      //   const [tmp] = await querysql(`
      //     SELECT * FROM user WHERE user.name = '${search}'
      //   `);
      //   if (tmp) {
      //     //只查询该用户的
      //     search = "";
      //     uid = tmp.id;
      //   }
      // }

// const ret = await querysql<any[]>(`
//   SELECT goods.id, goods.title, goods.preview,
//   user.name AS user_name,
//   user.account AS user_account,
//   user.avatar AS user_avatar,
//   COUNT(c1.id) AS like_count,
//   c2.id AS liked_id
//   FROM goods
//   LEFT JOIN user ON user.id = goods.uid
//   LEFT JOIN collect AS c1 ON c1.gid = goods.id AND c1.type = 'like'
//   LEFT JOIN collect AS c2 ON c2.gid = goods.id AND c2.type = 'like'
//   AND c2.uid = ${token?.uid ?? -1}
//   WHERE goods.status = 'public'
//   ${
//     search
//       ? `AND MATCH(goods.title, goods.intro) AGAINST('${search}' WITH QUERY EXPANSION)`
//       : ""
//   }
//   ${uid ? `AND goods.uid = ${uid}` : ""}
//   GROUP BY goods.id, c2.id
//   ${search ? "" : "ORDER BY goods.create_at DESC"}
//   LIMIT ${(page - 1) * page_size}, ${page_size}
// `).then((d) =>
//   d.map(
//     ({
//       user_name: name,
//       user_avatar: avatar,
//       user_account: account,
//       ...goods
//     }) => ({
//       ...goods,
//       user: { account, name, avatar, id: goods.uid },
//     })
//   )
// );


      // const [ret] = await querysql<any[]>(`
      //   SELECT goods.*,
      //   user.name AS user_name,
      //   user.account AS user_account,
      //   user.avatar AS user_avatar,
      //   (SELECT COUNT(collect.id) FROM collect
      //   WHERE collect.gid = goods.id
      //   AND collect.type = 'like'
      //   ) as like_count,
      //   (SELECT collect.id FROM collect
      //   WHERE collect.gid = goods.id
      //   AND collect.type = 'like'
      //   AND collect.uid = ${token?.uid ?? -1}
      //   ) as liked_id,
      //   (SELECT collect.id FROM collect
      //   WHERE collect.gid = goods.id
      //   AND collect.type = 'collect'
      //   AND collect.uid = ${token?.uid ?? -1}
      //   ) as collected_id
      //   FROM goods
      //   LEFT JOIN user ON user.id = goods.uid
      //   WHERE goods.id = ${params.id}
      // `).then((d) =>
      //   d.map(
      //     ({
      //       user_account: account,
      //       user_name: name,
      //       user_avatar: avatar,
      //       ...goods
      //     }) => ({
      //       ...goods,
      //       user: { account, name, avatar, id: goods.uid },
      //     })
      //   )
      // );

      // ret.locked = ret.plan === "free" ? false : true;

      // //已经登录
      // if (token && ret.plan === "buy") {
      //   //是自己
      //   if (token.uid === ret.uid) {
      //     ret.locked = false;
      //   } else {
      //     //不是自己
      //     let [order] = await querysql(`
      //       SELECT * FROM gorder
      //       WHERE uid = ${token.uid}
      //       AND gid = ${ret.id}
      //       AND status = 'paid'
      //     `);
      //     if (order) {
      //       ret.locked = false;
      //     }
      //   }
      // }

      // if (ret.locked) {
      //   delete ret.files;
      // }

// const parent_ret = await querysql<any[]>(`
      //   SELECT comment.*,
      //   user.name AS user_name,
      //   user.account AS user_account,
      //   user.avatar AS user_avatar
      //   FROM comment
      //   LEFT JOIN user ON user.id = comment.uid
      //   WHERE comment.gid = ${searchParams.get("gid")}
      //   AND comment.parent_id IS NULL
      //   ORDER BY comment.create_at DESC
      //   LIMIT ${(page - 1) * page_size}, ${page_size}
      // `).then((d) =>
      //   //解构字段
      //   d.map(
      //     ({
      //       user_name: name,
      //       user_avatar: avatar,
      //       user_account: account,
      //       ...comment
      //     }) => ({
      //       ...comment,
      //       user: { account, name, avatar, id: comment.uid },
      //     })
      //   )
      // );

      // const ret = await Promise.all(
      //   parent_ret.map(async (item) => {
      //     return {
      //       ...item,
      //       child: await querysql<any[]>(`
      //         SELECT comment.*,
      //         user.name AS user_name,
      //         user.account AS user_account,
      //         user.avatar AS user_avatar,
      //         to_user.name AS to_name
      //         FROM comment
      //         LEFT JOIN user ON user.id = comment.uid
      //         LEFT JOIN user AS to_user ON to_user.id = comment.to_uid
      //         WHERE comment.gid = ${item.gid}
      //         AND comment.parent_id = ${item.id}
      //         ORDER BY comment.create_at DESC
      //       `).then((d) =>
      //         d.map(
      //           ({
      //             user_name: name,
      //             user_avatar: avatar,
      //             user_account: account,
      //             ...comment
      //           }) => ({
      //             ...comment,
      //             user: { account, name, avatar, id: comment.uid },
      //           })
      //         )
      //       ),
      //     };
      //   })
      // );