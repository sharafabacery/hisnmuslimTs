SELECT t.id as titleId,t.name,t.search,c.id as contentId,c.content,c.fadl,c.source,c.hokm,c.search as contentSearch,c.count
FROM titles t
INNER JOIN contents c
ON t.id=c.titleId
order by t.id


SELECT * 
FROM(
SELECT T.ID,T.SEARCH,COUNT(*) AS COUNTER
FROM contents C
JOIN titles T
ON C.titleId=T.ID
GROUP BY T.ID,T.SEARCH
)
WHERE COUNTER>1