# Confluence Server REST API v10.2.0 - Complete Documentation

*Generated on: 2025-11-05T04:28:07.800Z*

## Overview

This is the reference document for the Atlassian Confluence DC REST API. The REST API is for developers who want to: 

 - integrate Confluence with other applications;

 - create scripts that interact with Confluence; or

 - develop plugins that enhance the Confluence UI, using REST to interact with the backend. 

 You can read more about developing Confluence plugins in the [Confluence Developer Documentation](https://developer.atlassian.com/server/confluence/).

**Base URL**: `{{protocol}}://{{host}}/{{basePath}}`
**Version**: 10.2.0
**Authentication**: Basic Authentication

## Table of Contents

- [Access Mode](#access-mode)
- [Admin Group](#admin-group)
- [Admin Space](#admin-space)
- [Admin User](#admin-user)
- [Admin Users](#admin-users)
- [Attachments](#attachments)
- [Backup and Restore](#backup-and-restore)
- [Category](#category)
- [Child Content](#child-content)
- [Cluster information](#cluster-information)
- [Content Blueprint](#content-blueprint)
- [Content Body](#content-body)
- [Content Descendant](#content-descendant)
- [Content Labels](#content-labels)
- [Content Property](#content-property)
- [Content Resource](#content-resource)
- [Content Restrictions](#content-restrictions)
- [Content Version](#content-version)
- [Content Watchers](#content-watchers)
- [Global Permissions](#global-permissions)
- [GlobalColorScheme](#globalcolorscheme)
- [Group](#group)
- [Index Management](#index-management)
- [Instance Metrics](#instance-metrics)
- [Label](#label)
- [Long Task](#long-task)
- [Search](#search)
- [Server Information](#server-information)
- [Space](#space)
- [Space Label](#space-label)
- [Space Permissions](#space-permissions)
- [Space Property](#space-property)
- [Space Watchers](#space-watchers)
- [SpaceColorScheme](#spacecolorscheme)
- [User](#user)
- [User Group](#user-group)
- [User Watch](#user-watch)
- [Webhooks](#webhooks)
- [Other operations](#other-operations)

## Access Mode

### Get access mode status

**Method**: `GET`
**Path**: `{{basePath}}rest/api/accessmode`

**Description**: Returns the access mode status for Confluence.

**Headers**:

- `Accept`: `application/json`

---

## Admin Group

### Create group

**Method**: `POST`
**Path**: `{{basePath}}rest/api/admin/group`

**Description**: Creates the given group identified by name.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Delete group

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/admin/group/:groupName`

**Description**: Deletes the given group identified by name.

---

## Admin Space

### Creates personal Space for a User.

**Method**: `POST`
**Path**: `{{basePath}}rest/api/admin/space/personal/:username`

**Description**: Creates a personal space for a user.

Example request URI: 

`http://example.com/confluence/rest/api/admin/space/personal/morganlee`

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

## Admin User

### Change password

**Method**: `POST`
**Path**: `{{basePath}}rest/api/admin/user/:username/password`

**Description**: Change the password for the user identified by the username. 

**Validation rules** : 

- The new password should not be null or blank. 



**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Create user

**Method**: `POST`
**Path**: `{{basePath}}rest/api/admin/user`

**Description**: One of the following options could be used:

1. Create a user with a specified password. The userName, fullName, email and password needs to be specified.

2. Create a user with an email notification to the user. The userName, fullName, email and notifyViaEmail (true) needs to be specified.

**Requirements**:

- The userName should not be null or blank

- The userName should not contain any of these characters \ , +  ' "

- The userName should not contain any whitespace characters

- The userName should not be "anonymous"

- The userName should not contain any upper case characters

- The fullName should not be null or blank

- The fullName should not contain any of these characters

- The fullName should not be "anonymous"

- The email should not be null or blank

- The email should be a valid email address

- If notifyViaEmail is false then the password should not be null or blank

- If notifyViaEmail is true then the password should not be specified

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Update user

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/admin/user/:username`

**Description**: Updates the user identified by the username. The following fields can be updated: email, full name.
"**Requirements**:
- The fullName should not be blank
- The fullName should not contain any forbidden characters ()
- The fullName should not be anonymous (in english or other system locale)
- The email should not be blank
- The email should be a valid email address


**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Delete user

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/admin/user/:username`

**Description**: Deletes the given User identified by username. This action is processed asynchronously.

---

### Disable user

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/admin/user/:username/disable`

**Description**: Disables the given User identified by username. This method is idempotent i.e. if the user is already disabled then no action will be taken.

---

### Enable user

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/admin/user/:username/enable`

**Description**: Enables the given User identified by username. This method is idempotent i.e. if the user is already enabled then no action will be taken.

---

## Admin Users

### Get active users

**Method**: `GET`
**Path**: `{{basePath}}rest/api/admin/users/list/active`

**Description**: Gets a paginated collection of all active users (users which count into license usage).
This will exclude users that are:
- anonymous,
- deactivated,
- externally deleted,
- shadowed
- unlicensed

This feature relies on search index and might not be accurate when site reindex is in progress.

Depending on the type of the user the response can include the following fields:
- `email`: The user's email address.
- `lastLogin`: The date and time of the user's last successful login. Required "lastLogin" expansion.
- `type`: The type of user (e.g., `known`, `anonymous`).
- `username`: The user's username.
- `userKey`: The unique key identifying the user.
- `displayName`: The user's full display name.

Example request URI(s):
`http://example.com/confluence/rest/api/admin/users/list/active`
`http://example.com/confluence/rest/api/admin/users/list/active?start=0`
`http://example.com/confluence/rest/api/admin/users/list/active?start=0&limit=100`
`http://example.com/confluence/rest/api/admin/users/list/active?start=0&limit=100&expand=status`


**Headers**:

- `Accept`: `application/json`

---

## Attachments

### Get attachment

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/child/attachment`

**Description**: Returns a paginated list of attachment Content entities within a single container.

---

### Create attachments

**Method**: `POST`
**Path**: `{{basePath}}rest/api/content/:id/child/attachment`

**Description**: Add one or more attachments to a Confluence Content entity, with optional comments.

**Comments are optional**, but if included there must be as many comments as there are files, and the comments must be in the same order as the files.

This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. Most client libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP Components library provides a `MultiPartEntity` that makes it simple to submit a multipart POST.

In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection on it. This means you must submit a header of `X-Atlassian-Token: nocheck` with the request, otherwise it will be blocked.

The name of the multipart/form-data parameter that contains attachments must be 'file'.

**Headers**:

- `Content-Type`: `multipart/form-data`
- `Accept`: `application/json`

**Request Body**:

Form Data:

- `file`: {{file}}
- `comment`: {{comment}}
- `minorEdit`: {{minorEdit}}
- `hidden`: {{hidden}}

---

### /rest/api/content/{id}/child/attachment/{attachmentId}/extractedtext

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/child/attachment/:attachmentId/extractedtext`

**Headers**:

- `Accept`: `application/json`

---

### Move attachment

**Method**: `POST`
**Path**: `{{basePath}}rest/api/content/:id/child/attachment/:attachmentId/move`

**Description**: Move an attachment to a different content entity object. 

**When moving the attachment**, the name of the attachment can be updated as well. 

In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection on it. This means you must submit a header of `X-Atlassian-Token: nocheck` with the request, otherwise it will be blocked. 

A simple example to move an attachment with id "456" in a container with id "123" to a container with "789": 

`curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" "http://myhost/rest/api/content/123/child/attachment/456/move?newContentId=789"` 

An example to move the same file, while also renaming it to "my-new-name": 

`curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" "http://myhost/rest/api/content/123/child/attachment/456/move?newContentId=789&newName=my-new-name"` 

This can also be used to only rename an attachment: 

`curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" "http://myhost/rest/api/content/123/child/attachment/456/move?newContentId=123&newName=my-new-name"`

---

### Update non-binary data of an Attachment

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/content/:id/child/attachment/:attachmentId`

**Description**: Update the non-binary data of an attachment.This resource can be used to update an attachment's filename, media-type, comment, and parent container.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Remove attachment

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/content/:id/child/attachment/:attachmentId`

**Description**: This method will delete the attachment identified by attachmentId.

It returns a boolean response indicating whether the operation was successful or not. If the specified attachment or version does not exist, or if the user does not have permission to remove the attachment, appropriate exceptions are thrown and mapped to their corresponding HTTP responses.

---

### Remove attachment version

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/content/:id/child/attachment/:attachmentId/version/:version`

**Description**: This method will delete the specified version of an attachment identified by attachmentId and version.

If the operation is successful, it returns a response indicating that no content is returned. If the specified attachment or version does not exist, or if the user does not have permission to remove the attachment, appropriate exceptions are thrown and mapped to their corresponding HTTP responses.

---

### Update binary data of an attachment

**Method**: `POST`
**Path**: `{{basePath}}rest/api/content/:id/child/attachment/:attachmentId/data`

**Description**: Update the binary data of an Attachment, and optionally the comment and the minor edit field.

This adds a new version of the attachment, containing the new binary data, filename, and content-type.

**When updating the binary data of an attachment**, the comment related to it together with the field that specifies if it's a minor edit can be updated as well, but are not required.

If an update is considered to be a minor edit, notifications will not be sent to the watchers of that content.

This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. Most client libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP Components library provides a `MultiPartEntity` that makes it simple to submit a multipart POST.

In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection on it. This means you must submit a header of `X-Atlassian-Token: nocheck` with the request, otherwise it will be blocked.

The name of the multipart/form-data parameter that contains attachments must be 'file'.

**Headers**:

- `Content-Type`: `multipart/form-data`
- `Accept`: `application/json`

**Request Body**:

Form Data:

- `file`: {{file}}
- `comment`: {{comment}}
- `minorEdit`: {{minorEdit}}
- `hidden`: {{hidden}}

---

## Backup and Restore

### Cancel all queued jobs

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/backup-restore/jobs/clear-queue`

**Description**: Cancels all queued jobs. Does not affect jobs that are being processed at the moment.

**Headers**:

- `Accept`: `application/json`

---

### Cancel job

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/backup-restore/jobs/:jobId/cancel`

**Description**: Cancels the job. If the job is already cancelled or failed, the method will do nothing.

**Headers**:

- `Accept`: `application/json`

---

### Create site backup job

**Method**: `POST`
**Path**: `{{basePath}}rest/api/backup-restore/backup/site`

**Description**: Starts the new site backup job.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Create site restore job

**Method**: `POST`
**Path**: `{{basePath}}rest/api/backup-restore/restore/site`

**Description**: Starts the new site restore job.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Create site restore job for upload backup file

**Method**: `POST`
**Path**: `{{basePath}}rest/api/backup-restore/restore/site/upload`

**Description**: This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. 

Most client libraries have classes that make dealing with multipart posts simple. 

For instance, in Java the Apache HTTP Components library provides a MultiPartEntity that makes it simple to submit a multipart POST. 

 In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection on it.  This means you must submit a header of X-Atlassian-Token: nocheck with the request, otherwise it will be blocked. 

 The name of the multipart/form-data parameter that contains attachments must be "file". 

 An example to attach the file: 

 curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F  file=@myfile.zip http://myhost/rest/api/backup-restore/restore/space/upload 

.

**Headers**:

- `Content-Type`: `multipart/form-data`
- `Accept`: `application/json`

**Request Body**:

Form Data:

- `file`: {{file}}

---

### Create space backup job

**Method**: `POST`
**Path**: `{{basePath}}rest/api/backup-restore/backup/space`

**Description**: Creates new space backup job and adds it to the queue.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Create space restore job

**Method**: `POST`
**Path**: `{{basePath}}rest/api/backup-restore/restore/space`

**Description**: Creates new space restore job and adds it to the queue.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Create space restore job for upload backup file

**Method**: `POST`
**Path**: `{{basePath}}rest/api/backup-restore/restore/space/upload`

**Description**: This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. 

Most client libraries have classes that make dealing with multipart posts simple. 

For instance, in Java the Apache HTTP Components library provides a MultiPartEntity that makes it simple to submit a multipart POST. 

 In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection on it.  This means you must submit a header of X-Atlassian-Token: nocheck with the request, otherwise it will be blocked. 

 The name of the multipart/form-data parameter that contains attachments must be "file". 

 An example to attach the file: 

 curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F  file=@myfile.zip http://myhost/rest/api/backup-restore/restore/space/upload 

.

**Headers**:

- `Content-Type`: `multipart/form-data`
- `Accept`: `application/json`

**Request Body**:

Form Data:

- `file`: {{file}}

---

### Download backup file

**Method**: `GET`
**Path**: `{{basePath}}rest/api/backup-restore/jobs/:jobId/download`

**Description**: Downloads the backup file for the given job. Requires site admin or space export permissions for all spaces included in the backup job.

**Headers**:

- `Accept`: `application/json`

---

### Find jobs by filters

**Method**: `GET`
**Path**: `{{basePath}}rest/api/backup-restore/jobs`

**Description**: Returns jobs based on the filters provided. The user must have permission to see the jobs.

**Headers**:

- `Accept`: `application/json`

---

### Get files in restore directory

**Method**: `GET`
**Path**: `{{basePath}}rest/api/backup-restore/restore/files`

**Description**: returns list of information on files in conf-home/restore/(jobScope).

**Headers**:

- `Accept`: `application/json`

---

### Get job by ID

**Method**: `GET`
**Path**: `{{basePath}}rest/api/backup-restore/jobs/:jobId`

**Description**: Get job by id. The user must be a sysadmin or the owner of the job.

**Headers**:

- `Accept`: `application/json`

---

## Category

### Add a category to a space

**Method**: `POST`
**Path**: `{{basePath}}rest/api/space/:spaceKey/category/:labelName`

**Description**: Adds a category the description of a given {@link Space} identified by spaceKey.

Example request URI to add space category 'testCategory' to space with space key TEST:

`https://example.com/confluence/rest/api/space/TEST/category/testCategory`

---

### Remove a category from a space

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/space/:spaceKey/category/:categoryName`

**Description**: Removes a category from a space, identified by spaceKey.

Example request URI:
`https://example.com/confluence/rest/api/space/TEST/category/example-category`

---

## Child Content

### Get children of content

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/child`

**Description**: Returns a map of the direct children of a piece of Content. Content can have multiple types of children. For example, a Page can have children that are also Pages, but it can also have Comments and Attachments. 

The types of the children returned is specified by the `expand` query parameter in the request. This parameter can include expands for multiple child types. If no types are included in the `expand` parameter, the map returned will just list the child types that are available to be expanded for the content referenced by the `id` path parameter.

**Headers**:

- `Accept`: `application/json`

---

### Get children of content by type

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/child/:type`

**Description**: Returns the direct children of a piece of Content, limited to a single child type.The types of the children returned is specified by the "type" path parameter in the request.

**Headers**:

- `Accept`: `application/json`

---

### Get comments of content

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/child/comment`

**Description**: Returns the comments of a piece of Content. Example request URI(s): 

- `http://example.com/confluence/rest/api/content/1234/child/comment`
- `http://example.com/confluence/rest/api/content/1234/child/comment?expand=body.view`
- `http://example.com/confluence/rest/api/content/1234/child/comment?start=20&limit=10`
- `http://example.com/confluence/rest/api/content/1234/child/comment?location=footer&location=inline&location=resolved`
- `http://example.com/confluence/rest/api/content/1234/child/comment?expand=extensions.inlineProperties,extensions.resolution`

**Headers**:

- `Accept`: `application/json`

---

## Cluster information

### Get node statuses in a cluster

**Method**: `GET`
**Path**: `{{basePath}}rest/api/cluster/nodes`

**Description**: Returns a paginated list of information about each node in a cluster. Example request URI(s):
- `https://example.com/confluence/rest/api/cluster/nodes`
- `https://example.com/confluence/rest/api/cluster/nodes?start=0&limit=10`


**Headers**:

- `Accept`: `application/json`

---

## Content Blueprint

### Publish shared draft

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/content/blueprint/instance/:draftId`

**Description**: Publishes a shared draft of a Content created from a ContentBlueprint.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Publish legacy draft

**Method**: `POST`
**Path**: `{{basePath}}rest/api/content/blueprint/instance/:draftId`

**Description**: Publishes a legacy draft of a Content created from a ContentBlueprint.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

## Content Body

### Convert body representation

**Method**: `POST`
**Path**: `{{basePath}}rest/api/contentbody/convert/:to`

**Description**: Converts between content body representations. Not all representations can be converted to/from other formats. Supported conversions: 

- `storage -> view,export_view,styled_view,editor`
- `editor -> storage`
- `view -> None`
- `export_view -> None`
- `styled_view -> None`

Example request URI(s):

- `http://example.com/confluence/rest/api/contentbody/convert/view`

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

## Content Descendant

### Get Descendants

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/descendant`

**Description**: Returns a map of the descendants of a piece of Content. Content can have multiple types of descendants - for example a Page can have descendants that are also Pages, but it can also have Comments and Attachments. 

The ContentType(s) of the descendants returned is specified by the `expand` query parameter in the request - this parameter can include expands for multiple descendant types. If no types are included in the expand parameter, the map returned will just list the descendant types that are available to be expanded for the Content referenced by the `id` path parameter. 

Currently the only supported descendants are comment descendants of non-comment Content. 

Example request URI(s): 

`http://example.com/confluence/rest/api/content/1234/descendant` 

`http://example.com/confluence/rest/api/content/1234/descendant?expand=comment.body.VIEW` 

`http://example.com/confluence/rest/api/content/1234/descendant?expand=comment`

**Headers**:

- `Accept`: `application/json`

---

### Get descendants of type

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/descendant/:type`

**Description**: Returns the direct descendants of a piece of Content. The ContentType(s) of the descendants returned is specified by the `type` path parameter in the request. Currently the only supported descendants are comment descendants of non-comment Content. 

Example request URI(s): 

`http://example.com/confluence/rest/api/content/1234/descendant/comment` 

`http://example.com/confluence/rest/api/content/1234/descendant/comment?expand=body.VIEW` 

`http://example.com/confluence/rest/api/content/1234/descendant/comment?start=20&limit=10`

**Headers**:

- `Accept`: `application/json`

---

## Content Labels

### Get labels

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/label`

**Description**: Returns the list of labels on a piece of Content. Example request URI(s): 

- `http://example.com/confluence/rest/api/content/1234/label`
- `http://example.com/confluence/rest/api/content/1234/label?prefix=global&start=0&limit=200`

**Headers**:

- `Accept`: `application/json`

---

### Add Labels

**Method**: `POST`
**Path**: `{{basePath}}rest/api/content/:id/label`

**Description**: Adds a list of labels to the specified content. The body is the json representation of the list.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Delete label with query param

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/content/:id/label`

**Description**: Deletes a labels to the specified content.

---

### Delete label

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/content/:id/label/:label`

**Description**: Deletes a labels to the specified content. The body is the json representation of the list. When calling this method through REST the label parameter doesn't accept `/` characters in label names, because of security constraints. For this case please use the query parameter version of this method (`/content/{id}/label?name={label}`)

---

## Content Property

### Find all content properties

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/property`

**Description**: Returns a paginated list of content properties. Example request URI(s): 

- `http://example.com/confluence/rest/api/content/1234/property?expand=content,version`

**Headers**:

- `Accept`: `application/json`

---

### Create a content property

**Method**: `POST`
**Path**: `{{basePath}}rest/api/content/:id/property`

**Description**: Creates a new content property.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Find content property by key

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/property/:key`

**Description**: Returns a content property. Example request URI(s): 

- `http://example.com/confluence/rest/api/content/1234/property/example-property-key?expand=content,version`

**Headers**:

- `Accept`: `application/json`

---

### Update content property

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/content/:id/property/:key`

**Description**: Updates a content property. The body contains the representation of the content property. Must include the property id, and the new version number. Attempts to create a new content property if the given version number is `1`

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### /rest/api/content/{id}/property/{key}

**Method**: `POST`
**Path**: `{{basePath}}rest/api/content/:id/property/:key`

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Delete content property

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/content/:id/property/:key`

**Description**: Deletes a content property.

---

## Content Resource

### Get content

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content`

**Description**: Returns a paginated list of Content. Example request URI(s): 

- `http://example.com/confluence/rest/api/content?spaceKey=TST&title=Cheese&expand=space,body.view,version,container`
- `http://example.com/confluence/rest/api/content?type=blogpost&spaceKey=TST&title=Bacon&postingDay=2014-02-13&expand=space,body.view,version,container`

**Headers**:

- `Accept`: `application/json`

---

### Create content

**Method**: `POST`
**Path**: `{{basePath}}rest/api/content`

**Description**: Creates a new piece of Content or publishes the draft if the content id is present. For the case publishing draft, a new piece of content will be created and all metadata from the draft will be transferred into the newly created content.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Get content by ID

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id`

**Description**: Returns a piece of Content. Example request URI(s): 

- `http://example.com/confluence/rest/api/content/1234?expand=space,body.view,version,container`
- `http://example.com/confluence/rest/api/content/1234?status=any`

**Headers**:

- `Accept`: `application/json`

---

### Delete content

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/content/:id`

**Description**: Trashes or purges a piece of Content, based on its ContentType and ContentStatus. 

There are three cases:

- If the content is trashable and its status is current, it will be trashed.

- If the content is trashable, its status is trashed and the status query parameter in the request is trashed, the content will be purged from the trash and deleted permanently.

- If the content is not trashable it will be deleted permanently without being trashed.

**Headers**:

- `Accept`: `application/json`

---

### Get history of content

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/history`

**Description**: Returns the history of a particular piece of content. Example request URI(s): 

- `http://example.com/confluence/rest/api/content/1234/history`
- `http://example.com/confluence/rest/api/content/1234/history?expand=previousVersion,nextVersion,lastUpdated`
- `http://example.com/confluence/rest/api/content/1234/history?cql=creator=currentUser()&cqlcontext={"spaceKey":"TST", "contentId":"55"}&expand=previousVersion,nextVersion,lastUpdated`
- `http://example.com/confluence/rest/api/content/1234/history?cql=creator=currentUser()&cqlcontext={"spaceKey":"TST", "contentId":"55"}&expand=previousVersion,nextVersion,lastUpdated&start=0&limit=10`

**Headers**:

- `Accept`: `application/json`

---

### Get macro body by hash

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/history/:version/macro/hash/:hash`

**Description**: Returns the body of a macro (in storage format) with the given hash. This resource is primarily used by connect applications that require the body of macro to perform their work. 

The hash is generated by connect during render time of the local macro holder and is usually only relevant during the scope of one request. For optimisation purposes, this hash will usually live for multiple requests. 

Collecting a macro by its hash should now be considered deprecated and will be replaced, transparently with macroIds. This resource is currently only called from connect addons which will eventually all use the `getContentById` resource. 

To make the migration as seamless as possible, this resource will match macros against a generated hash or a stored macroId. This will allow add ons to work during the migration period.

**Headers**:

- `Accept`: `application/json`

---

### Get macro body by macro ID

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/history/:version/macro/id/:macroId`

**Description**: Returns the body of a macro (in storage format) with the given id. This resource is primarily used by connect applications that require the body of macro to perform their work. 

When content is created, if no macroId is specified, then Confluence will generate a random id. The id is persisted as the content is saved and only modified by Confluence if there are conflicting IDs. 

To preserve backwards compatibility this resource will also match on the hash of the macro body, even if a macroId is found. This check will become redundant as pages get macroId's generated for them and transparently propagate out to all instances.

**Headers**:

- `Accept`: `application/json`

---

### Scan content by space key

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/scan`

**Description**: Returns a paginated list of Content. Example request URI(s): 

- `http://example.com/confluence/rest/api/content/scan?spaceKey=TST&limit=100&expand=space,body.view,version,container`
- `http://example.com/confluence/rest/api/content/scan?limit=100&expand=space,body.view,version,container`

**Headers**:

- `Accept`: `application/json`

---

### Search content using CQL

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/search`

**Description**: Fetch a list of content using the Confluence Query Language (CQL). See: [Advanced searching using CQL](https://developer.atlassian.com/display/CONFDEV/Advanced+Searching+using+CQL) 

 Example request URI(s): 

- `http://localhost:8080/confluence/rest/api/content/search?cql=creator=currentUser()&cqlcontext={"spaceKey":"TST", "contentId":"55"}`
- `http://localhost:8080/confluence/rest/api/content/search?cql=space=DEV AND label=docs&expand=space,metadata.labels&limit=10`

**Headers**:

- `Accept`: `application/json`

---

### Update content

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/content/:contentId`

**Description**: Updates a piece of Content, including changes to content status. 

To update a piece of content you must increment the `version.number`, supplying the number of the version you are creating. The `title` property can be updated on all content, `body` can be updated on all content that has a body (not attachments). For instance to update the content of a blogpost that currently has version 1:

`PUT /rest/api/content/456`

```json
{
   "version":{
       "number": 2
   },
   "title":"My new title",
   "type":"page",
   "body":{
        "storage":{
           "value":"New page data.",
           "representation":"storage"
      }
   }
}
```

To update a page and change its parent page, supply the `ancestors` property with the request with the parent as the first ancestor i.e. to move a page to be a child of page with ID 789:

`PUT /rest/api/content/456`

```json
{
   "version":{
       "number": 2
   },
   "ancestors": [{"id":789}],
   "type":"page",
   "body":{
        "storage":{
           "value":"New page data.",
           "representation":"storage"
      }
   }
}
```

Changing status

To restore a piece of content that has the status of trashed the content must have it's `version` incremented, and `status` set to `current`. No other field modifications will be performed when restoring a piece of content from the trash.

Request example to restore from trash: `{"id": "557059","status": "current","version": {"number": 2}}`

If the content you're updating has a draft, specifying `status=draft` will delete that draft and the `body` of the content will be replaced with the `body` specified in the request.

Request example to delete a draft:

`PUT:  http://localhost:9096/confluence/rest/api/content/2149384202?status=draft`

```json
{
   "id":"2149384202",
   "status":"current",
   "version":{
      "number":4
   },
   "space":{
      "key":"TST"
   },
   "type":"page",
   "title":"page title",
   "body":{
      "storage":{
         "value":"New page data.",
         "representation":"storage"
      }
   }
}
```

Changing page position

To set page position, supply the `position` property in the request body with a positive integer. Content with unset positions will have a `position` value of -1. To unset a content position, supply `position` property with -1.

Request example to set page position to 1

`PUT /rest/api/content/2149384202`

```json
{
   "id":"2149384202",
   "version":{
      "number":2
   },
   "type":"page",
   "title":"page title",
   "position":1
}
```

 Request example to unset page position 

`PUT /rest/api/content/2149384202`

```json
{
   "id":"2149384202",
   "version":{
      "number":2
   },
   "type":"page",
   "position":-1
}
```



**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

## Content Restrictions

### Get all restrictions by Operation

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/restriction/byOperation`

**Description**: Returns info about all restrictions by operation.

**Headers**:

- `Accept`: `application/json`

---

### Get all restrictions for given operation

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/restriction/byOperation/:operationKey`

**Description**: Returns info about all restrictions of given operation.

**Headers**:

- `Accept`: `application/json`

---

### Get all view restriction both direct and inherited.

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:id/restriction/relevantViewRestrictions`

**Description**: Returns relevant view restriction both direct and inherited for a single content.

**Headers**:

- `Accept`: `application/json`

---

### Update restrictions

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/content/:id/restriction`

**Description**: Sets all the restrictions specified to a piece of content identified by `contentId`. Setting per-content restrictions is currently allowed for Pages or BlogPosts only. 

Example request URI: 

`http://example.com/confluence/rest/content/1234567/restriction?expand=`

The payload uses the same schema as returned by the GET requests from `/rest/api/content/{id}/restriction/byOperation*` which can be used as a template but is not necessary. 

Example request for a single content restriction: 

```json
[ { "operation": "update", "restrictions": { "user": [ { "type": "known", "username": "admin" } ] } } ]
```

Example request for updating two ContentRestrictions: 

```json
[ { "operation": "update", "restrictions": { "user": [ { "type": "known", "username": "admin" } ] } }, { "operation": "read", "restrictions": { "user": [ { "type": "known", "username": "fred" } ] } } ]
```

Rules for using this method: 

- The provided ContentRestrictions will overwrite any existing restrictions on the Content for the corresponding operations. 
- If the provided `ContentRestriction` lacks any supported operations, the restrictions for the operations will not be altered. 
- Setting `users` and/or `groups` map entries as empty arrays will remove the corresponding content restrictions. 
- Missing `users` and/or `groups` map entries means the corresponding operation's user/group content restrictions won't be changed. 
- Modifying restrictions to revoke the requesting user's access is prohibited.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

## Content Version

### Delete content history

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/content/:id/version/:versionNumber`

**Description**: Delete a historical version of a page or a blogpost. Current user must have edit permission on content, or it will throw a permission exception.

---

## Content Watchers

### Fetch users watching a given content

**Method**: `GET`
**Path**: `{{basePath}}rest/api/content/:contentId/watchers`

**Description**: Returns a paginated list of Users watching the given Content identified by contentId. Only a Confluence Administrator or Space Administrator can perform this action.

**Headers**:

- `Accept`: `application/json`

---

## Global Permissions

### Get global permissions

**Method**: `GET`
**Path**: `{{basePath}}rest/api/permissions`

**Description**: Returns list of permissions granted to users and groups.

Example request URI's:

       `https://example.com/confluence/rest/api/permissions`

**Headers**:

- `Accept`: `application/json`

---

### Set global permissions to multiple users/groups

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/permissions`

**Description**: Sets global permissions to multiple users/groups.

Request should contain all permissions that users/groups will have.

If permission is absent in the request, but was granted before, it will be revoked.

If empty list of permissions passed to users/groups, then all their existing permissions will be revoked.

If users/groups not mentioned in the request, their permissions will not be revoked.


Maximum 40 different users/groups could be passed in the request by default
.

Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:

* application use
* application administer
* system administer
* personal_space create
* space create

See Global Permissions documentation for additional information about supported permissions.


Example request URI's:
`https://example.com/confluence/rest/api/permissions`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json
[
  {
    "userKey": "4028ae289154667d0191546e11a10001",
    "operations": [
      {
        "operationKey": "create",
        "targetType": "space"
      },
      {
        "operationKey": "use",
        "targetType": "application"
      }
    ]
  },
  {
    "groupName": "group1",
    "operations": [
      {
        "operationKey": "create",
        "targetType": "personal_space"
      },
      {
        "operationKey": "use",
        "targetType": "application"
      },
      {
        "operationKey": "administer",
        "targetType": "application"
      }
    ]
  }
]
```

---

### Gets the permissions granted to an anonymous user

**Method**: `GET`
**Path**: `{{basePath}}rest/api/permissions/anonymous`

**Description**: Returns list of permissions granted to anonymous user.

Example request URI's:

       `https://example.com/confluence/rest/api/permissions/anonymous`

**Headers**:

- `Accept`: `application/json`

---

### Gets global permissions granted to a group

**Method**: `GET`
**Path**: `{{basePath}}rest/api/permissions/group/:groupName`

**Description**: Returns list of permissions granted to group.

Example request URI's:

       `https://example.com/confluence/rest/api/permissions/group/{groupName}}`

**Headers**:

- `Accept`: `application/json`

---

### Gets the permissions granted to an unlicensed users

**Method**: `GET`
**Path**: `{{basePath}}rest/api/permissions/unlicensed`

**Description**: Returns list of permissions granted to unlicensed users.

Example request URI's:

       `https://example.com/confluence/rest/api/permissions/unlicensed`

**Headers**:

- `Accept`: `application/json`

---

### Gets global permissions granted to a user

**Method**: `GET`
**Path**: `{{basePath}}rest/api/permissions/user/:user`

**Description**: Returns list of permissions granted to user.

Example request URI's:

       with userKey: `https://example.com/confluence/rest/api/permissions/user/{userKey}`

       with username: `https://example.com/confluence/rest/api/permissions/user/{username}`

**Headers**:

- `Accept`: `application/json`

---

### Grants global permissions to anonymous users

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/permissions/anonymous/grant`

**Description**: Grant global permissions to anonymous users.

Operation doesn't override existing permissions, will only add those one that weren't granted before.

Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:

* application use
* read user

Example request URI's:

       `https://example.com/confluence/rest/api/permissions/anonymous/grant`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Grants global permissions to a group

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/permissions/group/:groupName/grant`

**Description**: Grant global permissions to a group.

Operation doesn't override existing permissions, will only add those one that weren't granted before.

Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:

* application use
* application administer
* system administer
* personal_space create
* space create

See Global Permissions documentation for additional information about supported permissions.


Example request URI's:

`https://example.com/confluence/rest/api/permissions/group/test-group-name/grant`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Grants global permissions to unlicensed users

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/permissions/unlicensed/grant`

**Description**: Grant global permissions to unlicensed users.

Operation doesn't override existing permissions, will only add those one that weren't granted before.

Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:

* application use_unlicensed
* read user

Example request URI's:

       `https://example.com/confluence/rest/api/permissions/unlicensed/grant`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Grants global permissions to a user

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/permissions/user/:user/grant`

**Description**: Grant global permissions to a user.

Operation doesn't override existing permissions, will only add those one that weren't granted before.

Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:

* application use
* application administer
* system administer
* personal_space create
* space create

Example request URI's:

with userKey: `https://example.com/confluence/rest/api/permissions/user/{userKey}/grant`

with username: `https://example.com/confluence/rest/api/permissions/user/{username}/grant`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Revoke global permissions from anonymous users

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/permissions/anonymous/revoke`

**Description**: Revoke global permissions from anonymous users.

When 'application use' is revoked, all granted permissions will be removed from anonymous users.

Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:

* application use
* read user

Example request URI's:

       `https://example.com/confluence/rest/api/permissions/anonymous/revoke`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Revoke global permissions from a group

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/permissions/group/:groupName/revoke`

**Description**: Revoke global permissions from a group.

When 'application use' is revoked, all granted permissions will be removed from target group.

Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:

* application use
* application administer
* system administer
* personal_space create
* space create

See Global Permissions documentation for additional information about supported permissions.


Example request URI's:

`https://example.com/confluence/rest/api/permissions/group/test-group-name/revoke`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Revoke global permissions from unlicensed users

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/permissions/unlicensed/revoke`

**Description**: Revoke global permissions from unlicensed users.

When 'application use_unlicensed' is revoked, all granted permissions will be removed from unlicensed users.

Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:

* application use_unlicensed
* read user

Example request URI's:

       `https://example.com/confluence/rest/api/permissions/unlicensed/revoke`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Revoke global permissions from a user

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/permissions/user/:user/revoke`

**Description**: Revoke global permissions from a user.

When 'application use' is revoked, all granted permissions will be removed from target user.

Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:

* application use
* application administer
* system administer
* personal_space create
* space create

See Global Permissions documentation for additional information about supported permissions.


Example request URI's:

with userKey: `https://example.com/confluence/rest/api/permissions/user/{userKey}/revoke`

with username: `https://example.com/confluence/rest/api/permissions/user/{username}/revoke`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

## GlobalColorScheme

### Get default global color scheme

**Method**: `GET`
**Path**: `{{basePath}}rest/api/color-scheme/default`

**Description**: Get default color scheme for the instance



**Headers**:

- `Accept`: `application/json`

---

### Get global color scheme

**Method**: `GET`
**Path**: `{{basePath}}rest/api/color-scheme`

**Description**: Get information about the current color scheme for the instance



**Headers**:

- `Accept`: `application/json`

---

### Set global color scheme

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/color-scheme`

**Description**: Update the current color scheme of the instance



**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Reset global color scheme

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/color-scheme/reset`

**Description**: Reset the global color scheme colors to default



**Headers**:

- `Accept`: `application/json`

---

## Group

### Get group ancestor of a group

**Method**: `GET`
**Path**: `{{basePath}}rest/api/group/:groupName/groupancestor`

**Description**: Get a collection of the specified group's direct parent groups and all its ancestors (i.e. the parents of its parents, and so on)

**Headers**:

- `Accept`: `application/json`

---

### Get group ancestor of a group

**Method**: `GET`
**Path**: `{{basePath}}rest/api/group/groupancestor`

**Description**: Get a collection of the specified group's direct parent groups and all its ancestors (i.e. the parents of its parents, and so on)

**Headers**:

- `Accept`: `application/json`

---

### Get group by name

**Method**: `GET`
**Path**: `{{basePath}}rest/api/group/:groupName`

**Description**: Get the user group with the group name

**Headers**:

- `Accept`: `application/json`

---

### Get group by name

**Method**: `GET`
**Path**: `{{basePath}}rest/api/group/info`

**Description**: Get the user group with the group name

**Headers**:

- `Accept`: `application/json`

---

### Get groups

**Method**: `GET`
**Path**: `{{basePath}}rest/api/group`

**Description**: Get a paginated collection of user groups

**Headers**:

- `Accept`: `application/json`

---

### Get members of group

**Method**: `GET`
**Path**: `{{basePath}}rest/api/group/:groupName/member`

**Description**: **You need admin permissions to use this endpoint.**  
Get a paginated collection of users in the given group.

**Headers**:

- `Accept`: `application/json`

---

### Get members of group

**Method**: `GET`
**Path**: `{{basePath}}rest/api/group/member`

**Description**: **You need admin permissions to use this endpoint.**  
Get a paginated collection of users in the given group.

**Headers**:

- `Accept`: `application/json`

---

### Get group members of group

**Method**: `GET`
**Path**: `{{basePath}}rest/api/group/:groupName/groupmember`

**Description**: Get a collection of child groups of the given group

**Headers**:

- `Accept`: `application/json`

---

### Get group members of group

**Method**: `GET`
**Path**: `{{basePath}}rest/api/group/groupmember`

**Description**: Get a collection of child groups of the given group

**Headers**:

- `Accept`: `application/json`

---

### Get group parents of a group

**Method**: `GET`
**Path**: `{{basePath}}rest/api/group/:groupName/groupparent`

**Description**: Get a collection of the given group's immediate parent groups

**Headers**:

- `Accept`: `application/json`

---

### Get group parents of a group

**Method**: `GET`
**Path**: `{{basePath}}rest/api/group/groupparent`

**Description**: Get a collection of the given group's immediate parent groups

**Headers**:

- `Accept`: `application/json`

---

## Index Management

### Get reindex status

**Method**: `GET`
**Path**: `{{basePath}}rest/api/index/reindex`

**Description**: Returns the current status of the most recent reindex operation.
This includes information about progress, completion status, elapsed time, and job ID.

Example request URI:
`http://example.com/confluence/rest/api/reindex/reindex`


**Headers**:

- `Accept`: `application/json`

---

### Rebuild Confluence search index

**Method**: `POST`
**Path**: `{{basePath}}rest/api/index/reindex`

**Description**: Rebuilds Confluence's search index.
This operation is only available to system administrators and may take significant time to complete.

Example request URI(s):
- `http://example.com/confluence/rest/api/reindex/reindex`
- `http://example.com/confluence/rest/api/reindex/reindex?option=CONTENT_ONLY&spaceKey=DEMO`
- `http://example.com/confluence/rest/api/reindex/reindex?option=ATTACHMENT_ONLY&option=CONTENT_ONLY&spaceKey=DEMO&spaceKey=TEST`


**Headers**:

- `Accept`: `application/json`

---

### Reset reindex job status

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/index/resetjob`

**Description**: Resets the status of the current reindex job.
This is useful when a reindex job has failed and needs to be cleared before starting a new reindex operation.
This operation is only available to system administrators.


**Headers**:

- `Accept`: `application/json`

---

### Remove all content from search index

**Method**: `POST`
**Path**: `{{basePath}}rest/api/index/unindex`

**Description**: Removes all content from the search index, effectively clearing the entire search index.
This operation is destructive and will require a full reindex to restore search functionality.
This operation is only available to system administrators.

**Warning**: This operation will remove all searchable content from the index.
Users will not be able to search for content until a reindex is performed.

Example request URI:
`http://example.com/confluence/rest/api/reindex/unindex`


**Headers**:

- `Accept`: `application/json`

---

## Instance Metrics

### Get instance metrics

**Method**: `GET`
**Path**: `{{basePath}}rest/api/instance-metrics`

**Description**: Returns simple metrics about this instance.

**Headers**:

- `Accept`: `application/json`

---

## Label

### Get list of labels matching the given label name, namespace, space (via space key) or owner.

**Method**: `GET`
**Path**: `{{basePath}}rest/api/label/labels`

**Description**: Returns a paginated list of labels matching the given label name, namespace, space (via space key) or owner.
Leave query params empty to ignore.

Example request URI(s):
`http://example.com/confluence/rest/api/label/labels?spaceKey=MYS&namespace=global&limit=3`

**Headers**:

- `Accept`: `application/json`

---

### Get most popular labels

**Method**: `GET`
**Path**: `{{basePath}}rest/api/label/popular`

**Description**: Returns a paginated list of the most popular labels within a Confluence instance. This includes
Labels used by Pages, Blog Posts, and other Content types. Labels are sorted
based on number of occurrences from the most to the least used. Only global labels are considered in this list.

Example request URI's:
`https://example.com/confluence/rest/api/label/popular`
`https://example.com/confluence/rest/api/label/popular?start=2&limit=1`

**Headers**:

- `Accept`: `application/json`

---

### Get recently used labels

**Method**: `GET`
**Path**: `{{basePath}}rest/api/label/recent`

**Description**: Returns a paginated list of recently used labels within a Confluence instance. Labels are sorted
from the most to the least recently used. Only global labels are considered in this list.

Example request URI's:
`https://example.com/confluence/rest/api/label/recent`
`https://example.com/confluence/rest/api/label/recent?start=2&limit=1`

**Headers**:

- `Accept`: `application/json`

---

### Get related labels.

**Method**: `GET`
**Path**: `{{basePath}}rest/api/label/:labelName/related`

**Description**: Return a paginated list of labels related to the given label name sorted by frequency of use in descending order.
The current process for identifying related labels solely
examines global labels, but it may change in the future.

The max number of labels that the API can respond with is limited, as we are filtering the access for each label.
This is set to 10000 by default but can be modified by the system property `confluence.rest.labels.related.max.to.process`.

Example request URI's:
`https://example.com/confluence/rest/api/label/test_label_name/related`
`https://example.com/confluence/rest/api/label/my:test_label_name/related?limit=200`

**Headers**:

- `Accept`: `application/json`

---

## Long Task

### Get task by ID

**Method**: `GET`
**Path**: `{{basePath}}rest/api/longtask/:id`

**Description**: Returns information about a long-running task.

**Headers**:

- `Accept`: `application/json`

---

### Get tasks

**Method**: `GET`
**Path**: `{{basePath}}rest/api/longtask`

**Description**: Returns information about all tracked long-running tasks.

**Headers**:

- `Accept`: `application/json`

---

## Search

### Search for entities in confluence

**Method**: `GET`
**Path**: `{{basePath}}rest/api/search`

**Description**: Search for entities in Confluence using the [Confluence Query Language (CQL)](https://developer.atlassian.com/confdev/confluence-rest-api/advanced-searching-using-cql). For example:

Example request URI(s):

- `http://localhost:8080/confluence/rest/api/search?cql=creator=currentUser()&type%20in%20(space,page,user)&cqlcontext={"spaceKey":"TST", "contentId":"55"}`

- `http://localhost:8080/confluence/rest/api/search?cql=siteSearch~'example'%20AND%20label=docs&expand=content.space,space.homepage&limit=10`

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

## Server Information

### Get server information

**Method**: `GET`
**Path**: `{{basePath}}rest/api/server-information`

**Description**: Returns information about the current application build running on this instance.

**Headers**:

- `Accept`: `application/json`

---

## Space

### Archive space

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/archive`

**Description**: Archive the given Space identified by spaceKey. This method is idempotent i.e., if the Space is already archived then no action will be taken.

---

### Get contents in space

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/content`

**Description**: Returns the content in this given space. 

Example request URI: 

`http://example.com/confluence/rest/api/space/TEST/content?expand=history`

**Headers**:

- `Accept`: `application/json`

---

### Get trash contents of space

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/trash`

**Description**: Returns the trash contents in this given space. 

Example request URI: 

`http://example.com/confluence/rest/api/space/TEST/trash?limit=100&cursor=content:false:612345`

**Headers**:

- `Accept`: `application/json`

---

### Remove all trash contents

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/space/:spaceKey/trash`

**Description**: Remove all content from the trash in the given space, deleting them permanently.Example request URI: 

`http://example.com/confluence/rest/api/space/TEST/trash`

---

### Get contents by type

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/content/:type`

**Description**: Returns the content in this given space with the given type. 

Example request URI: 

`http://example.com/confluence/rest/api/space/TEST/content/page?expand=history`

**Headers**:

- `Accept`: `application/json`

---

### Creates the personal Space for self.

**Method**: `POST`
**Path**: `{{basePath}}rest/api/space/personal`

**Description**: Creates a personal space for self.

Example request URI: 

`http://example.com/confluence/rest/api/space/personal`

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Create private space

**Method**: `POST`
**Path**: `{{basePath}}rest/api/space/_private`

**Description**: Creates a new private Space, viewable only by its creator. The incoming Space does not include an id, but must include a Key and Name, and should include a Description.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Get spaces by key

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space`

**Description**: Returns information about a number of spaces. 

Example request URI(s): 

`http://example.com/confluence/rest/api/space?spaceKey=TST&spaceKey=ds`

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Creates a new Space.

**Method**: `POST`
**Path**: `{{basePath}}rest/api/space`

**Description**: Creates a new Space. The incoming Space does not include an id, but must include a Key and Name, and should include a Description.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Get space

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey`

**Description**: Returns information about a space. 

Example request URI: 

`http://example.com/confluence/rest/api/space/TST?expand=description`

**Headers**:

- `Accept`: `application/json`

---

### Update Space

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey`

**Description**: Updates a Space. The incoming Space must include a Key and Name, and should include a Description

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Delete Space

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/space/:spaceKey`

**Description**: Deletes a Space. The space is deleted in a long running task, so the space cannot be considered deleted when this resource returns. Clients can follow the status link in the response and poll it until the task completes.

---

### Restore space

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/restore`

**Description**: Restore the given Space identified by spaceKey. This method is idempotent i.e., if the Space is already restored then no action will be taken.

---

## Space Label

### Fetch all labels

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/labels`

**Description**: Returns a paginated list of all Labels used by Content within the given Space.
This includes Labels used by Pages, Blog Posts, and other Content types.

Example request URI:
`https://example.com/confluence/rest/api/space/TEST/labels`

**Headers**:

- `Accept`: `application/json`

---

### Get popular labels

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/labels/popular`

**Description**: Returns a paginated list of all Labels used by Content within the given Space.This includes Labels used by Pages, Blog Posts, and other Content types.

Example request URI(s):
`https://example.com/confluence/rest/api/space/TEST/labels/popular`

**Headers**:

- `Accept`: `application/json`

---

### Get recent labels

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/labels/recent`

**Description**: Returns a paginated list of the most recent Labels used by Content within the given Space.This includes Labels used by Pages, Blog Posts, and other Content types.

Example request URI:
`https://example.com/confluence/rest/api/space/TEST/labels/recent`

**Headers**:

- `Accept`: `application/json`

---

### Get related labels

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/labels/:labelName/related`

**Description**: Returns a paginated list of related Labels used by Content within the given Space.A Label is defined as being related to another when it is found attached to the same Content as the Label specified in the request.

Example request URI:
`https://example.com/confluence/rest/api/space/TEST/labels/example-label/related`

**Headers**:

- `Accept`: `application/json`

---

## Space Permissions

### Get all space permissions

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/permissions`

**Description**: Returns list of permissions granted to users and groups in the particular space.

Example request URI's:
`https://example.com/confluence/rest/api/space/TESTSPACE/permissions`

**Headers**:

- `Accept`: `application/json`

---

### Set permissions to multiple users/groups/anonymous user in the given space

**Method**: `POST`
**Path**: `{{basePath}}rest/api/space/:spaceKey/permissions`

**Description**: Sets permissions to multiple users/groups in the given space.
Request should contain all permissions that user/group/anonymous user will have in a given space.
If permission is absent in the request, but was granted before, it will be revoked.
If empty list of permissions passed to user/group/anonymous user, then all their existing permissions will be revoked.
If user/group/anonymous user not mentioned in the request, their permissions will not be revoked.

Maximum 40 different users/groups/anonymous user could be passed in the request.

See Space Permissions documentation for additional information about supported permissions.

Example request URI's:
`https://example.com/confluence/rest/api/space/TESTSPACE/permissions`

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json
[
  {
    "userKey": "4028ae289154667d0191546e11a10001",
    "operations": [
      {
        "operationKey": "read",
        "targetType": "space"
      },
      {
        "operationKey": "administer",
        "targetType": "space"
      }
    ]
  },
  {
    "groupName": "group1",
    "operations": [
      {
        "operationKey": "read",
        "targetType": "space"
      },
      {
        "operationKey": "create",
        "targetType": "comment"
      }
    ]
  },
  {
    "operations": [
      {
        "operationKey": "read",
        "targetType": "space"
      }
    ]
  }
]
```

---

### Gets the permissions granted to an anonymous user in a space

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/permissions/anonymous`

**Description**: Returns list of permissions granted to anonymous user in the particular space.

Example request URI's:
`https://example.com/confluence/rest/api/space/TESTSPACE/permissions/anonymous`

**Headers**:

- `Accept`: `application/json`

---

### Gets the permissions granted to a group in a space

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/permissions/group/:groupName`

**Description**: Returns list of permissions granted to a group in the particular space.

Example request URI's:
`https://example.com/confluence/rest/api/space/TESTSPACE/permissions/group/test-group-name`

**Headers**:

- `Accept`: `application/json`

---

### Gets the permissions granted to a user in a space

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/permissions/user/:userKey`

**Description**: Returns list of permissions granted to user in the particular space.

Example request URI's:
`https://example.com/confluence/rest/api/space/TESTSPACE/permissions/user/4028ae289154667d0191546bd5840000`

**Headers**:

- `Accept`: `application/json`

---

### Grants space permissions to anonymous user

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/permissions/anonymous/grant`

**Description**: Grant permissions to anonymous user in the given space.
Operation doesn't override existing permissions, will only add those one that weren't granted before.
Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:
* space read
* space administer
* space export
* space restrict
* space delete_own
* space delete_mail
* page create
* page delete
* blogpost create
* blogpost delete
* comment create
* comment delete
* attachment create
* attachment delete

See Space Permissions documentation for additional information about supported permissions.

Example request URI's:
`https://example.com/confluence/rest/api/space/TESTSPACE/permissions/anonymous/grant`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json
[
  {
    "targetType": "space",
    "operationKey": "read"
  },
  {
    "targetType": "page",
    "operationKey": "create"
  }
]
```

---

### Grants space permissions to a group

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/permissions/group/:groupName/grant`

**Description**: Grant permissions to a group in the given space.
Operation doesn't override existing permissions, will only add those one that weren't granted before.
Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:
* space read
* space administer
* space export
* space restrict
* space delete_own
* space delete_mail
* page create
* page delete
* blogpost create
* blogpost delete
* comment create
* comment delete
* attachment create
* attachment delete

See Space Permissions documentation for additional information about supported permissions.

Example request URI's:
`https://example.com/confluence/rest/api/space/TESTSPACE/permissions/group/test-group-name/grant`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json
[
  {
    "targetType": "space",
    "operationKey": "read"
  },
  {
    "targetType": "page",
    "operationKey": "create"
  }
]
```

---

### Grants space permissions to a user

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/permissions/user/:userKey/grant`

**Description**: Grant permissions to a user in the given space.
Operation doesn't override existing permissions, will only add those one that weren't granted before.
Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:
* space read
* space administer
* space export
* space restrict
* space delete_own
* space delete_mail
* page create
* page delete
* blogpost create
* blogpost delete
* comment create
* comment delete
* attachment create
* attachment delete

See Space Permissions documentation for additional information about supported permissions.

Example request URI's:
`https://example.com/confluence/rest/api/space/TESTSPACE/permissions/user/4028ae289154667d0191546bd5840000/grant`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json
[
  {
    "targetType": "space",
    "operationKey": "read"
  },
  {
    "targetType": "page",
    "operationKey": "create"
  }
]
```

---

### Revoke space permissions from anonymous user

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/permissions/anonymous/revoke`

**Description**: Revoke permissions from anonymous user in the given space.
If anonymous user doesn't have permissions that we are trying to revoke, those permissions will be silently skipped.
Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:
* space read
* space administer
* space export
* space restrict
* space delete_own
* space delete_mail
* page create
* page delete
* blogpost create
* blogpost delete
* comment create
* comment delete
* attachment create
* attachment delete

See Space Permissions documentation for additional information about supported permissions.

Example request URI's:
`https://example.com/confluence/rest/api/space/TESTSPACE/permissions/anonymous/revoke`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json
[
  {
    "targetType": "page",
    "operationKey": "delete"
  },
  {
    "targetType": "page",
    "operationKey": "create"
  }
]
```

---

### Revoke space permissions from a group

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/permissions/group/:groupName/revoke`

**Description**: Revoke permissions from a group in the given space.
If group doesn't have permissions that we are trying to revoke, those permissions will be silently skipped.
Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:
* space read
* space administer
* space export
* space restrict
* space delete_own
* space delete_mail
* page create
* page delete
* blogpost create
* blogpost delete
* comment create
* comment delete
* attachment create
* attachment delete

See Space Permissions documentation for additional information about supported permissions.

Example request URI's:
`https://example.com/confluence/rest/api/space/TESTSPACE/permissions/group/test-group-name/revoke`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json
[
  {
    "targetType": "page",
    "operationKey": "delete"
  },
  {
    "targetType": "page",
    "operationKey": "create"
  }
]
```

---

### Revoke space permissions from a user

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/permissions/user/:userKey/revoke`

**Description**: Revoke permissions from a user in the given space.
If user doesn't have permissions that we are trying to revoke, those permissions will be silently skipped.
Multiple permissions could be passed in one request. Supported targetType and operationKey pairs:
* space read
* space administer
* space export
* space restrict
* space delete_own
* space delete_mail
* page create
* page delete
* blogpost create
* blogpost delete
* comment create
* comment delete
* attachment create
* attachment delete

See Space Permissions documentation for additional information about supported permissions.

Example request URI's:
`https://example.com/confluence/rest/api/space/TESTSPACE/permissions/user/4028ae289154667d0191546bd5840000/revoke`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json
[
  {
    "targetType": "page",
    "operationKey": "delete"
  },
  {
    "targetType": "page",
    "operationKey": "create"
  }
]
```

---

## Space Property

### Get space properties

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/property`

**Description**: Returns a paginated list of space properties. 

Example request URI: 

`http://example.com/confluence/rest/api/space/TST/property?expand=space,version`

**Headers**:

- `Accept`: `application/json`

---

### Create a space property

**Method**: `POST`
**Path**: `{{basePath}}rest/api/space/:spaceKey/property`

**Description**: Creates a new space property.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Get space property by key

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/property/:key`

**Description**: Returns a space property. 

Example request URI: 

`http://example.com/confluence/rest/api/space/TST/property/example-property-key?expand=space,version`

**Headers**:

- `Accept`: `application/json`

---

### Update space property

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/property/:key`

**Description**: Updates a space property.The body contains the representation of the space property. Must include new version number.If the given version number is 1, attempts to create a new space property.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Create a space property with a specific key

**Method**: `POST`
**Path**: `{{basePath}}rest/api/space/:spaceKey/property/:key`

**Description**: Create a space property with a specific key.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Delete space property

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/space/:spaceKey/property/:key`

**Description**: Deletes a space property. 

Example request URI: 

`http://example.com/confluence/rest/api/space/TST/property/example-property-key?expand=space,version`

---

## Space Watchers

### Fetch users watching space

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/watchers`

**Description**: Returns a paginated list of users watching the given Space identified by spaceKey. Only a Confluence Administrator or Space Administrator can perform this action.

**Headers**:

- `Accept`: `application/json`

---

## SpaceColorScheme

### Get Space color scheme type

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/color-scheme/type`

**Description**: Get the current color scheme type used for a space, it can be global or custom



**Headers**:

- `Accept`: `application/json`

---

### Update Space color scheme type

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/color-scheme/type`

**Description**: Update the color scheme type used for a space, currently it can be global or custom



**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Get Space color scheme

**Method**: `GET`
**Path**: `{{basePath}}rest/api/space/:spaceKey/color-scheme`

**Description**: Get information about the current color scheme for a space



**Headers**:

- `Accept`: `application/json`

---

### Update Space color scheme

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/color-scheme`

**Description**: Update the color scheme for a space



**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Reset Space color scheme

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/space/:spaceKey/color-scheme/reset`

**Description**: Reset the space color scheme to use global color scheme



**Headers**:

- `Accept`: `application/json`

---

## User

### Change password

**Method**: `POST`
**Path**: `{{basePath}}rest/api/user/current/password`

**Description**: Change the password for the current user. 

 Validation Rules: 

- New password supplied cannot be null or blank

Example request URI(s):

`http://example.com/confluence/rest/api/user/current/password`

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Get information about anonymous user type

**Method**: `GET`
**Path**: `{{basePath}}rest/api/user/anonymous`

**Description**: Get information about how anonymous is represented in Confluence. Example request URI(s):

`http://example.com/confluence/rest/api/user/anonymous`

**Headers**:

- `Accept`: `application/json`

---

### Get current user

**Method**: `GET`
**Path**: `{{basePath}}rest/api/user/current`

**Description**: Get information about the current logged in user. Example request URI(s):

`http://example.com/confluence/rest/api/user/current`

**Headers**:

- `Accept`: `application/json`

---

### Update details of the current user

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/user/current`

**Description**: Change the current user's details.

Validation Rules:
- Full name cannot be blank, containing <> characters or be reserved by Confluence.
- Email must be a valid email address.
- Current password must be supplied for changing email address.

Example PUT request URI(s):
`http://example.com/confluence/rest/api/user/current`


**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Get groups

**Method**: `GET`
**Path**: `{{basePath}}rest/api/user/memberof`

**Description**: Get a paginated collection of groups that the given user is a member of. Example request URI(s):

`http://example.com/confluence/rest/api/user/memberof?username=jblogs`
`http://example.com/confluence/rest/api/user/memberof?key=402880824ff933a4014ff9345d7c0002`

**Headers**:

- `Accept`: `application/json`

---

### Get user

**Method**: `GET`
**Path**: `{{basePath}}rest/api/user`

**Description**: Get information about a user identified by either user key or username. Example request URI(s):

`http://example.com/confluence/rest/api/user?username=jblogs`
`http://example.com/confluence/rest/api/user?key=402880824ff933a4014ff9345d7c0002`

**Headers**:

- `Accept`: `application/json`

---

### Get registered users

**Method**: `GET`
**Path**: `{{basePath}}rest/api/user/list`

**Description**: Gets a paginated collection of all registered users, including but not limited to:

- Disabled users
- Enabled users
- Enabled users which count towards the license count on the site
- Enabled users which do not count towards the license count on the site
- Enabled users which have "can use" global permissions
- Enabled users which do not have "can use" global permissions

Example request URI(s):

`http://example.com/confluence/rest/api/user/list`
`http://example.com/confluence/rest/api/user/list?start=0`
`http://example.com/confluence/rest/api/user/list?start=0&limit=100`
`http://example.com/confluence/rest/api/user/list?start=0&limit=100&expand=status`

**Headers**:

- `Accept`: `application/json`

---

### Update a user's preference settings

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/user/settings`

**Description**: Update the specified user's settings including their prefered language setting.

Values:
- Username cannot be blank.
- The user's locale preference can be removed by setting it to "None".

Example PUT request URI(s):
`http://example.com/confluence/rest/api/user/settings`


**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

## User Group

### Update user group

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/user/:username/group/:groupName`

**Description**: Add the given User identified by username to the given Group identified by groupName. 

This method is idempotent i.e., if the membership already exists then no action will be taken.

---

### Delete user group

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/user/:username/group/:groupName`

**Description**: Removes the given User identified by username from the given Group identified by groupName. 

This method is idempotent i.e., if the membership already exists then no action will be taken.

---

## User Watch

### Get information about content watcher

**Method**: `GET`
**Path**: `{{basePath}}rest/api/user/watch/content/:contentId`

**Description**: Get information about whether a user is watching a specified content. User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs to be a Confluence administrator. 

 Example request URI(s):

`http://example.com/confluence/rest/api/user/watch/content/131213`
`http://example.com/confluence/rest/api/user/watch/content/131213?username=jblogs`
`http://example.com/confluence/rest/api/user/watch/content/131213?key=ff8080815a58e24c015a58e263710000`

**Headers**:

- `Accept`: `application/json`

---

### Add content watcher

**Method**: `POST`
**Path**: `{{basePath}}rest/api/user/watch/content/:contentId`

**Description**: Create a new watcher for the given user and content id. User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs to be a Confluence administrator. 

 Example request URI(s):

`http://example.com/confluence/rest/api/user/watch/content/131213`
`http://example.com/confluence/rest/api/user/watch/content/131213?username=jblogs`
`http://example.com/confluence/rest/api/user/watch/content/131213?key=ff8080815a58e24c015a58e263710000`

**Headers**:

- `Accept`: `application/json`

---

### Remove content watcher

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/user/watch/content/:contentId`

**Description**: Delete an existing watcher for the given user and content id. User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs to be a Confluence administrator. 

 Example request URI(s):

`http://example.com/confluence/rest/api/user/watch/content/131213`
`http://example.com/confluence/rest/api/user/watch/content/131213?username=jblogs`
`http://example.com/confluence/rest/api/user/watch/content/131213?key=ff8080815a58e24c015a58e263710000`

---

### Get information about space watcher

**Method**: `GET`
**Path**: `{{basePath}}rest/api/user/watch/space/:spaceKey`

**Description**: Get information about whether a user is watching a specified space. User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs to be a Confluence administrator. 

 Example request URI(s):

`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY`
`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY?username=jblogs`
`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY?key=ff8080815a58e24c015a58e263710000`
`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY?contentType=blostpost`

**Headers**:

- `Accept`: `application/json`

---

### Add space watcher

**Method**: `POST`
**Path**: `{{basePath}}rest/api/user/watch/space/:spaceKey`

**Description**: Create a new watcher for the given user and space key. User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs to be a Confluence administrator. 

 Example request URI(s):

`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY`
`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY?username=jblogs`
`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY?key=ff8080815a58e24c015a58e263710000`
`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY?contentType=blogpost`

**Headers**:

- `Accept`: `application/json`

---

### Remove space watcher

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/user/watch/space/:spaceKey`

**Description**: Delete an existing watcher for the given user and space key. User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs to be a Confluence administrator. 

 Example request URI(s):

`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY`
`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY?username=jblogs`
`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY?key=ff8080815a58e24c015a58e263710000`
`http://example.com/confluence/rest/api/user/watch/space/SPACEKEY?contentType=blogpost`

---

## Webhooks

### Find webhooks

**Method**: `GET`
**Path**: `{{basePath}}rest/api/webhooks`

**Description**: Find webhooks. The authenticated user must be an administrator to call this resource.

**Headers**:

- `Accept`: `application/json`

---

### Create webhook

**Method**: `POST`
**Path**: `{{basePath}}rest/api/webhooks`

**Description**: Create a webhook via the URL. The authenticated user must be an administrator to call this resource.

**Headers**:

- `Content-Type`: `application/json`

**Request Body**:

```json

```

---

### Get webhook

**Method**: `GET`
**Path**: `{{basePath}}rest/api/webhooks/:webhookId`

**Description**: Get a webhook by id. The authenticated user must be an administrator to call this resource.

**Headers**:

- `Accept`: `application/json`

---

###  Update webhook

**Method**: `PUT`
**Path**: `{{basePath}}rest/api/webhooks/:webhookId`

**Description**:  Update an existing webhook. The authenticated user must be an administrator to call this resource.

**Headers**:

- `Content-Type`: `application/json`
- `Accept`: `application/json`

**Request Body**:

```json

```

---

### Delete webhook

**Method**: `DELETE`
**Path**: `{{basePath}}rest/api/webhooks/:webhookId`

**Description**: Delete a webhook via the URL. The authenticated user must be an administrator to call this resource.

---

### Get latest invocations

**Method**: `GET`
**Path**: `{{basePath}}rest/api/webhooks/:webhookId/latest`

**Description**: Get the latest invocations for a specific webhook. The authenticated user must be an administrator to call this resource.

**Headers**:

- `Accept`: `application/json`

---

### Get statistic

**Method**: `GET`
**Path**: `{{basePath}}rest/api/webhooks/:webhookId/statistics`

**Description**: Get the statistics for a specific webhook. The authenticated user must be an administrator to call this resource.

**Headers**:

- `Accept`: `application/json`

---

### Get statistics summary

**Method**: `GET`
**Path**: `{{basePath}}rest/api/webhooks/:webhookId/statistics/summary`

**Description**: Get the statistics summary for a specific webhook. The authenticated user must be an administrator to call this resource.

**Headers**:

- `Accept`: `application/json`

---

### Test webhook

**Method**: `POST`
**Path**: `{{basePath}}rest/api/webhooks/test`

**Description**: Test connectivity to a specific endpoint. The authenticated user must be an administrator to call this resource.

**Headers**:

- `Accept`: `application/json`

---

## Other operations

### /rest/api/audit

**Method**: `GET`
**Path**: `{{basePath}}rest/api/audit`

**Headers**:

- `Accept`: `application/json`

---

## Data Schemas

### Group

```json
{
  "properties": {
    "name": {
      "type": "string",
      "example": "group1"
    },
    "_links": {
      "type": "object",
      "properties": {
        "base": {
          "type": "string"
        },
        "context": {
          "type": "string"
        },
        "self": {
          "type": "string"
        }
      }
    },
    "_expandable": {
      "type": "object",
      "properties": {
        "attribute": {
          "type": "string"
        }
      }
    }
  }
}
```

### FormattedBody

```json
{
  "properties": {
    "representation": {
      "type": "string"
    },
    "value": {
      "type": "string",
      "example": "This is a body"
    },
    "webresource": {
      "$ref": "#/components/schemas/WebResourceDependencies"
    }
  }
}
```

### PersonalSpaceDetailsForCreation

```json
{
  "type": "object",
  "properties": {
    "description": {
      "type": "object"
    },
    "isPrivate": {
      "type": "boolean",
      "example": true
    },
    "private": {
      "type": "boolean"
    }
  }
}
```

### SuperBatchWebResources

```json
{
  "properties": {
    "uris": {
      "type": "object"
    },
    "tags": {
      "type": "object"
    },
    "metatags": {
      "type": "string"
    }
  }
}
```

### WebResourceDependencies

```json
{
  "properties": {
    "keys": {
      "type": "array",
      "example": [
        "key1",
        "key2",
        "key3"
      ],
      "items": {
        "type": "string",
        "example": "[\"key1\",\"key2\",\"key3\"]"
      }
    },
    "contexts": {
      "type": "array",
      "example": [
        "context1",
        "context2",
        "context3"
      ],
      "items": {
        "type": "string",
        "example": "[\"context1\",\"context2\",\"context3\"]"
      }
    },
    "uris": {
      "type": "object"
    },
    "tags": {
      "type": "object"
    },
    "superbatch": {
      "$ref": "#/components/schemas/SuperBatchWebResources"
    }
  }
}
```

### Icon

```json
{
  "properties": {
    "path": {
      "type": "string",
      "example": "http://www.example.com/path/to/image.png"
    },
    "width": {
      "type": "integer",
      "format": "int32",
      "example": 16
    },
    "height": {
      "type": "integer",
      "format": "int32",
      "example": 16
    },
    "isDefault": {
      "type": "boolean",
      "example": true
    }
  }
}
```

### Link

```json
{
  "properties": {
    "type": {
      "type": "string"
    },
    "path": {
      "type": "string"
    }
  }
}
```

### Person

```json
{
  "properties": {
    "profilePicture": {
      "$ref": "#/components/schemas/Icon"
    },
    "displayName": {
      "type": "string",
      "example": "Joe Smith"
    },
    "type": {
      "type": "string"
    }
  }
}
```

### ReferenceContent

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceIcon

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceSpacePermissionContainer

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceSpaceRetentionPolicy

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### Space

```json
{
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "example": 123456
    },
    "key": {
      "type": "string",
      "example": "TEST"
    },
    "name": {
      "type": "string",
      "example": "Test Space"
    },
    "status": {
      "type": "string",
      "example": "current"
    },
    "icon": {
      "$ref": "#/components/schemas/ReferenceIcon"
    },
    "description": {
      "type": "object"
    },
    "homepage": {
      "$ref": "#/components/schemas/ReferenceContent"
    },
    "links": {
      "type": "object"
    },
    "type": {
      "type": "string",
      "example": "global"
    },
    "creator": {
      "$ref": "#/components/schemas/Person"
    },
    "creationDate": {
      "type": "string",
      "format": "date-time",
      "example": "2024-01-01T00:00:00Z"
    },
    "lastModifier": {
      "$ref": "#/components/schemas/Person"
    },
    "lastModificationDate": {
      "type": "string",
      "format": "date-time",
      "example": "2024-01-01T00:00:00Z"
    },
    "metadata": {
      "type": "object",
      "example": {
        "labels": [
          "label1",
          "label2"
        ]
      }
    },
    "retentionPolicy": {
      "$ref": "#/components/schemas/ReferenceSpaceRetentionPolicy"
    },
    "permissions": {
      "$ref": "#/components/schemas/ReferenceSpacePermissionContainer"
    }
  }
}
```

### Credentials

```json
{
  "type": "object",
  "properties": {
    "password": {
      "type": "string",
      "example": "password"
    }
  }
}
```

### UserDetailsForCreation

```json
{
  "type": "object",
  "properties": {
    "userName": {
      "type": "string",
      "example": "user1"
    },
    "fullName": {
      "type": "string",
      "example": "Some User"
    },
    "email": {
      "type": "string",
      "example": "someuser@someemail.com"
    },
    "password": {
      "type": "string",
      "example": "password"
    },
    "notifyViaEmail": {
      "type": "boolean",
      "example": true
    }
  }
}
```

### UserDetailsForUpdate

```json
{
  "type": "object",
  "properties": {
    "fullName": {
      "type": "string",
      "example": "Some User"
    },
    "email": {
      "type": "string",
      "example": "someuser@someemail.com"
    },
    "currentPassword": {
      "type": "string",
      "example": "password"
    }
  }
}
```

### Cursor

```json
{
  "properties": {
    "cursorType": {
      "type": "string",
      "enum": [
        "SPACE",
        "CONTENT",
        "BLOG_POST",
        "COMMENT",
        "SYNC",
        "ATTACHMENT"
      ]
    },
    "reverse": {
      "type": "boolean"
    }
  }
}
```

### PageRequest

```json
{
  "properties": {
    "start": {
      "type": "integer",
      "format": "int32"
    },
    "cursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "limit": {
      "type": "integer",
      "format": "int32"
    }
  }
}
```

### PageResponsePerson

```json
{
  "type": "object",
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Person"
      }
    }
  }
}
```

### MockAttachmentRequest

```json
{
  "type": "object",
  "properties": {
    "file": {
      "type": "string",
      "description": "The name of the multipart/form-data parameter that contains attachments must be \\\"file\\\"."
    },
    "comment": {
      "type": "string",
      "description": "(optional) a list of \\\"comments\\\" matching the list of attachment data.\\nIf supplied, the size of this list must match the size of the fileParts list."
    },
    "minorEdit": {
      "type": "boolean",
      "description": "(optional) form parameter indicating whether the attachments should be \\\"minorEdits\\\".If \\\"minorEdits\\\" is set to true, no notification email will be generated for that attachment."
    },
    "hidden": {
      "type": "boolean",
      "description": "(optional) form parameter indicating whether the attachments should be \\\"hidden\\\".If \\\"hidden\\\" is set to true, no notification email or activity stream will be generated for that attachment."
    }
  }
}
```

### Anonymous

```json
{}
```

### Container

```json
{}
```

### Content

```json
{
  "properties": {
    "id": {
      "type": "string",
      "example": "123456"
    },
    "type": {
      "type": "string",
      "example": "page"
    },
    "status": {
      "type": "string",
      "example": "current"
    },
    "title": {
      "type": "string",
      "example": "My Page"
    },
    "links": {
      "type": "object"
    },
    "space": {
      "$ref": "#/components/schemas/Space"
    },
    "history": {
      "$ref": "#/components/schemas/History"
    },
    "version": {
      "$ref": "#/components/schemas/Version"
    },
    "ancestors": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Content"
      }
    },
    "position": {
      "type": "integer",
      "format": "int32",
      "example": 1
    },
    "operations": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/OperationCheckResult"
      }
    },
    "children": {
      "type": "object"
    },
    "descendants": {
      "type": "object"
    },
    "container": {
      "$ref": "#/components/schemas/Container"
    },
    "body": {
      "type": "object"
    },
    "metadata": {
      "type": "object",
      "example": {
        "key": "value"
      }
    },
    "extensions": {
      "type": "object",
      "example": {
        "key": "value"
      }
    },
    "restrictions": {
      "type": "object",
      "example": {
        "use": {
          "operation": "use",
          "restrictions": []
        }
      }
    },
    "relevantViewRestrictions": {
      "$ref": "#/components/schemas/ReferenceRelevantViewRestrictions"
    },
    "extractedTextLink": {
      "type": "string",
      "example": "/rest/api/content/98323/child/attachment/98329/extractedtext"
    },
    "historyRef": {
      "$ref": "#/components/schemas/ReferenceHistory"
    },
    "spaceRef": {
      "$ref": "#/components/schemas/ReferenceSpace"
    },
    "containerRef": {
      "$ref": "#/components/schemas/ReferenceContainer"
    },
    "versionRef": {
      "$ref": "#/components/schemas/ReferenceVersion"
    },
    "_links": {
      "type": "object",
      "properties": {
        "base": {
          "type": "string"
        },
        "context": {
          "type": "string"
        },
        "self": {
          "type": "string"
        }
      }
    },
    "_expandable": {
      "type": "object",
      "properties": {
        "attribute": {
          "type": "string"
        }
      }
    }
  }
}
```

### ContentBody

```json
{
  "properties": {
    "representation": {
      "type": "string"
    },
    "value": {
      "type": "string",
      "example": "This is a body"
    },
    "webresource": {
      "$ref": "#/components/schemas/WebResourceDependencies"
    },
    "content": {
      "$ref": "#/components/schemas/ReferenceContent"
    },
    "contentRef": {
      "$ref": "#/components/schemas/ReferenceContent"
    }
  }
}
```

### ContentRestriction

```json
{
  "properties": {
    "content": {
      "$ref": "#/components/schemas/ReferenceContent"
    },
    "operation": {
      "type": "string"
    },
    "restrictions": {
      "type": "object"
    },
    "lastModificationDate": {
      "type": "string",
      "format": "date-time",
      "example": "2024-01-01T00:00:00Z"
    }
  }
}
```

### History

```json
{
  "properties": {
    "previousVersion": {
      "$ref": "#/components/schemas/ReferenceVersion"
    },
    "nextVersion": {
      "$ref": "#/components/schemas/ReferenceVersion"
    },
    "lastUpdated": {
      "$ref": "#/components/schemas/ReferenceVersion"
    },
    "latest": {
      "type": "boolean",
      "example": true
    },
    "createdBy": {
      "$ref": "#/components/schemas/Person"
    },
    "createdDate": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T00:00:00Z"
    },
    "contributors": {
      "$ref": "#/components/schemas/ReferenceContributors"
    },
    "lastUpdatedRef": {
      "$ref": "#/components/schemas/ReferenceVersion"
    },
    "nextVersionRef": {
      "$ref": "#/components/schemas/ReferenceVersion"
    },
    "previousVersionRef": {
      "$ref": "#/components/schemas/ReferenceVersion"
    },
    "contentParentRef": {
      "$ref": "#/components/schemas/ReferenceContent"
    }
  }
}
```

### KnownUser

```json
{}
```

### OperationCheckResult

```json
{
  "properties": {
    "operation": {
      "type": "string",
      "example": "read"
    },
    "targetType": {
      "type": "string",
      "example": "page"
    }
  }
}
```

### PageResponseContent

```json
{
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Content"
      }
    }
  }
}
```

### PageResponseSubject

```json
{
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Subject"
      }
    }
  }
}
```

### ReferenceContainer

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceContributors

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceHistory

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceRelevantViewRestrictions

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceSpace

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceString

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceUserStatus

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceVersion

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### RestListContent

```json
{
  "type": "array",
  "properties": {
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Content"
      }
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "pageResponse": {
      "$ref": "#/components/schemas/PageResponseContent"
    },
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "first": {
      "$ref": "#/components/schemas/Content"
    },
    "last": {
      "$ref": "#/components/schemas/Content"
    }
  },
  "items": {
    "$ref": "#/components/schemas/Content"
  }
}
```

### Subject

```json
{
  "properties": {
    "displayName": {
      "type": "string"
    },
    "type": {
      "type": "string"
    }
  }
}
```

### UnknownUser

```json
{}
```

### User

```json
{}
```

### Version

```json
{
  "properties": {
    "by": {
      "$ref": "#/components/schemas/Person"
    },
    "when": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T00:00:00Z"
    },
    "message": {
      "type": "string",
      "example": "A message"
    },
    "number": {
      "type": "integer",
      "format": "int32",
      "example": 1
    },
    "minorEdit": {
      "type": "boolean",
      "example": true
    },
    "hidden": {
      "type": "boolean",
      "example": true
    },
    "syncRev": {
      "type": "string",
      "example": "123456"
    },
    "content": {
      "$ref": "#/components/schemas/ReferenceContent"
    },
    "contentRef": {
      "$ref": "#/components/schemas/ReferenceContent"
    }
  }
}
```

### FilePart

```json
{
  "type": "object",
  "properties": {
    "formField": {
      "type": "boolean"
    },
    "name": {
      "type": "string"
    },
    "value": {
      "type": "string"
    },
    "size": {
      "type": "integer",
      "format": "int64"
    },
    "inputStream": {
      "type": "object"
    },
    "contentType": {
      "type": "string"
    }
  }
}
```

### SiteBackupSettings

```json
{
  "properties": {
    "skipAttachments": {
      "type": "boolean",
      "example": true
    },
    "keepPermanently": {
      "type": "boolean",
      "example": true
    },
    "fileNamePrefix": {
      "type": "string",
      "example": "backup"
    }
  }
}
```

### SiteRestoreSettings

```json
{
  "properties": {
    "filename": {
      "type": "string",
      "writeOnly": true
    },
    "skipReindex": {
      "type": "boolean",
      "example": true
    },
    "fileName": {
      "type": "string",
      "example": "backup-2020-01-01-01-01-01.zip"
    }
  }
}
```

### ExampleMultipartFormData

```json
{
  "type": "object",
  "properties": {
    "file": {
      "type": "string",
      "description": "backup file uploaded. Has to be a zip file."
    }
  }
}
```

### SpaceBackupSettings

```json
{
  "properties": {
    "spaceKeys": {
      "uniqueItems": true,
      "type": "array",
      "example": "['SPACE1', 'SPACE2']",
      "items": {
        "type": "string",
        "example": "['SPACE1', 'SPACE2']"
      }
    },
    "keepPermanently": {
      "type": "boolean",
      "example": true
    },
    "fileNamePrefix": {
      "type": "string",
      "example": "backup"
    }
  }
}
```

### SpaceRestoreSettings

```json
{
  "properties": {
    "filename": {
      "type": "string",
      "writeOnly": true
    },
    "skipReindex": {
      "type": "boolean",
      "example": true
    },
    "fileName": {
      "type": "string",
      "example": "space123.zip"
    }
  }
}
```

### JobDetails

```json
{
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "example": 1
    },
    "jobOperation": {
      "type": "string",
      "example": "BACKUP",
      "enum": [
        "BACKUP",
        "RESTORE"
      ]
    },
    "jobScope": {
      "type": "string",
      "example": "SITE",
      "enum": [
        "SPACE",
        "SITE"
      ]
    },
    "jobState": {
      "type": "string",
      "example": "IN_PROGRESS",
      "enum": [
        "QUEUED",
        "PROCESSING",
        "COMPLETING",
        "FINISHED",
        "CANCELLING",
        "CANCELLED",
        "FAILED"
      ]
    },
    "createTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "startProcessingTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "finishProcessingTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "cancelTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "errorMessage": {
      "type": "string",
      "example": "Error message"
    },
    "owner": {
      "type": "string",
      "example": "admin"
    },
    "cancelledBy": {
      "type": "string",
      "example": "admin"
    },
    "fileName": {
      "type": "string",
      "example": "backup-2020-01-01.zip"
    },
    "spaceKeys": {
      "type": "string",
      "example": "spaceKey1,spaceKey2"
    },
    "fileDeleteTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "fileExists": {
      "type": "boolean",
      "example": true
    }
  }
}
```

### FileInfo

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "example": "backup-2020-01-01-01-01-01.zip"
    },
    "creationTime": {
      "type": "string",
      "example": "2020-01-01T01:01:01.000Z"
    },
    "size": {
      "type": "integer",
      "format": "int64",
      "example": 1000
    },
    "jobScope": {
      "type": "string",
      "example": "SITE",
      "enum": [
        "SPACE",
        "SITE"
      ]
    }
  }
}
```

### NodeStatus

```json
{
  "properties": {
    "nodeId": {
      "type": "integer",
      "format": "int32"
    },
    "jvmStats": {
      "type": "object"
    },
    "props": {
      "type": "object"
    },
    "buildStats": {
      "type": "object"
    }
  }
}
```

### PageResponseNodeStatus

```json
{
  "type": "object",
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/NodeStatus"
      }
    }
  }
}
```

### RestListNodeStatus

```json
{
  "type": "array",
  "properties": {
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/NodeStatus"
      }
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "pageResponse": {
      "$ref": "#/components/schemas/PageResponseNodeStatus"
    },
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "first": {
      "$ref": "#/components/schemas/NodeStatus"
    },
    "last": {
      "$ref": "#/components/schemas/NodeStatus"
    }
  },
  "items": {
    "$ref": "#/components/schemas/NodeStatus"
  }
}
```

### Label

```json
{
  "properties": {
    "prefix": {
      "type": "string",
      "example": "my"
    },
    "name": {
      "type": "string",
      "example": "label"
    },
    "id": {
      "type": "string",
      "example": "1234"
    },
    "label": {
      "type": "string"
    },
    "_links": {
      "type": "object",
      "properties": {
        "base": {
          "type": "string"
        },
        "context": {
          "type": "string"
        },
        "self": {
          "type": "string"
        }
      }
    },
    "_expandable": {
      "type": "object",
      "properties": {
        "attribute": {
          "type": "string"
        }
      }
    }
  }
}
```

### PageResponseLabel

```json
{
  "type": "object",
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Label"
      }
    }
  }
}
```

### JsonContentProperty

```json
{
  "properties": {
    "key": {
      "type": "string"
    },
    "value": {
      "$ref": "#/components/schemas/JsonString"
    },
    "version": {
      "$ref": "#/components/schemas/Version"
    },
    "id": {
      "type": "string"
    },
    "content": {
      "$ref": "#/components/schemas/Content"
    },
    "contentRef": {
      "$ref": "#/components/schemas/ReferenceContent"
    },
    "_links": {
      "type": "object",
      "properties": {
        "base": {
          "type": "string"
        },
        "context": {
          "type": "string"
        },
        "self": {
          "type": "string"
        }
      }
    },
    "_expandable": {
      "type": "object",
      "properties": {
        "attribute": {
          "type": "string"
        }
      }
    }
  }
}
```

### JsonString

```json
{
  "properties": {
    "value": {
      "type": "string"
    }
  }
}
```

### PageResponseJsonContentProperty

```json
{
  "type": "object",
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/JsonContentProperty"
      }
    }
  }
}
```

### RestListJsonContentProperty

```json
{
  "type": "array",
  "properties": {
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/JsonContentProperty"
      }
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "pageResponse": {
      "$ref": "#/components/schemas/PageResponseJsonContentProperty"
    },
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "first": {
      "$ref": "#/components/schemas/JsonContentProperty"
    },
    "last": {
      "$ref": "#/components/schemas/JsonContentProperty"
    }
  },
  "items": {
    "$ref": "#/components/schemas/JsonContentProperty"
  }
}
```

### MacroInstance

```json
{
  "properties": {
    "name": {
      "type": "string",
      "example": "panel"
    },
    "body": {
      "type": "string",
      "example": "This is the body of the panel macro."
    },
    "parameters": {
      "type": "object"
    }
  }
}
```

### MacroParameterInstance

```json
{
  "properties": {
    "value": {
      "type": "string",
      "example": "value"
    }
  }
}
```

### PageResponseContentRestriction

```json
{
  "type": "object",
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ContentRestriction"
      }
    }
  }
}
```

### RelevantViewRestrictions

```json
{
  "type": "object",
  "properties": {
    "viewContentRestrictions": {
      "$ref": "#/components/schemas/PageResponseContentRestriction"
    }
  }
}
```

### PageResponseUser

```json
{
  "type": "object",
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/User"
      }
    }
  }
}
```

### RestListUser

```json
{
  "type": "array",
  "properties": {
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/User"
      }
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "pageResponse": {
      "$ref": "#/components/schemas/PageResponseUser"
    },
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "first": {
      "$ref": "#/components/schemas/User"
    },
    "last": {
      "$ref": "#/components/schemas/User"
    }
  },
  "items": {
    "$ref": "#/components/schemas/User"
  }
}
```

### ColorSchemeModel

```json
{
  "properties": {
    "topBarColor": {
      "type": "string",
      "example": "#000000"
    },
    "topBarMenuSelectedBgColor": {
      "type": "string",
      "example": "#000000"
    },
    "topBarMenuSelectedTextColor": {
      "type": "string",
      "example": "#000000"
    },
    "breadcrumbsTextColor": {
      "type": "string",
      "example": "#000000"
    },
    "headerButtonBgColor": {
      "type": "string",
      "example": "#000000"
    },
    "headerButtonTextColor": {
      "type": "string",
      "example": "#000000"
    },
    "searchFieldTextColor": {
      "type": "string",
      "example": "#000000"
    },
    "searchFieldBgColor": {
      "type": "string",
      "example": "#000000"
    },
    "menuItemSelectedBgColor": {
      "type": "string",
      "example": "#000000"
    },
    "menuItemSelectedTextColor": {
      "type": "string",
      "example": "#000000"
    },
    "menuItemTextColor": {
      "type": "string",
      "example": "#000000"
    },
    "headingTextColor": {
      "type": "string",
      "example": "#000000"
    },
    "linkColor": {
      "type": "string",
      "example": "#000000"
    }
  }
}
```

### ColorSchemeThemeBasedModel

```json
{
  "properties": {
    "colorSchemeModelLight": {
      "$ref": "#/components/schemas/ColorSchemeModel"
    },
    "colorSchemeModelDark": {
      "$ref": "#/components/schemas/ColorSchemeModel"
    }
  }
}
```

### GlobalPermission

```json
{
  "type": "object",
  "properties": {
    "operation": {
      "$ref": "#/components/schemas/OperationDescription"
    },
    "subject": {
      "$ref": "#/components/schemas/Subject"
    }
  }
}
```

### OperationDescription

```json
{
  "type": "object",
  "properties": {
    "targetType": {
      "type": "string",
      "example": "space"
    },
    "operationKey": {
      "type": "string",
      "example": "read"
    }
  }
}
```

### SpacePermissionsForSubject

```json
{
  "type": "object",
  "properties": {
    "userKey": {
      "type": "string"
    },
    "groupName": {
      "type": "string"
    },
    "operations": {
      "uniqueItems": true,
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/OperationDescription"
      }
    }
  }
}
```

### RestInvocationHistory

```json
{
  "properties": {}
}
```

### RestWebhook

```json
{
  "properties": {
    "scopeType": {
      "type": "string"
    },
    "events": {
      "uniqueItems": true,
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "active": {
      "type": "boolean"
    },
    "sslVerificationRequired": {
      "type": "boolean"
    },
    "name": {
      "type": "string"
    },
    "configuration": {
      "type": "object"
    },
    "url": {
      "type": "string"
    },
    "credentials": {
      "$ref": "#/components/schemas/RestWebhookCredentials"
    },
    "statistics": {
      "type": "object",
      "properties": {},
      "writeOnly": true
    }
  }
}
```

### RestWebhookCredentials

```json
{
  "properties": {
    "username": {
      "type": "string"
    },
    "password": {
      "type": "string"
    }
  }
}
```

### PageResponseGroup

```json
{
  "type": "object",
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Group"
      }
    }
  }
}
```

### RestListLabel

```json
{
  "type": "array",
  "properties": {
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Label"
      }
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "pageResponse": {
      "$ref": "#/components/schemas/PageResponseLabel"
    },
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "first": {
      "$ref": "#/components/schemas/Label"
    },
    "last": {
      "$ref": "#/components/schemas/Label"
    }
  },
  "items": {
    "$ref": "#/components/schemas/Label"
  }
}
```

### LongTaskStatus

```json
{
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "$ref": "#/components/schemas/Message"
    },
    "elapsedTime": {
      "type": "integer",
      "format": "int64",
      "example": 123456
    },
    "percentageComplete": {
      "type": "integer",
      "format": "int32",
      "example": 50
    },
    "successful": {
      "type": "boolean",
      "example": true
    },
    "messages": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Message"
      }
    },
    "_links": {
      "type": "object",
      "properties": {
        "base": {
          "type": "string"
        },
        "context": {
          "type": "string"
        },
        "self": {
          "type": "string"
        }
      }
    },
    "_expandable": {
      "type": "object",
      "properties": {
        "attribute": {
          "type": "string"
        }
      }
    }
  }
}
```

### Message

```json
{
  "properties": {
    "translation": {
      "type": "string"
    },
    "key": {
      "type": "string"
    },
    "args": {
      "type": "array",
      "items": {
        "type": "object"
      }
    }
  }
}
```

### PageResponseLongTaskStatus

```json
{
  "type": "object",
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/LongTaskStatus"
      }
    }
  }
}
```

### RestListLongTaskStatus

```json
{
  "type": "array",
  "properties": {
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/LongTaskStatus"
      }
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "pageResponse": {
      "$ref": "#/components/schemas/PageResponseLongTaskStatus"
    },
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "first": {
      "$ref": "#/components/schemas/LongTaskStatus"
    },
    "last": {
      "$ref": "#/components/schemas/LongTaskStatus"
    }
  },
  "items": {
    "$ref": "#/components/schemas/LongTaskStatus"
  }
}
```

### ContainerSummary

```json
{
  "properties": {
    "title": {
      "type": "string",
      "example": "Demo Title"
    },
    "displayUrl": {
      "type": "string",
      "example": "http://localhost:8080/confluence/display/SPACEKEY/Page+Title"
    }
  }
}
```

### ContentSearchResult

```json
{}
```

### ReferenceContainerSummary

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceObject

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ReferenceUser

```json
{
  "properties": {
    "idProperties": {
      "type": "object"
    },
    "expanded": {
      "type": "boolean"
    }
  }
}
```

### ResourceType

```json
{
  "properties": {
    "name": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "url": {
      "type": "string"
    }
  }
}
```

### SearchPageResponseSearchResult

```json
{
  "type": "object",
  "properties": {
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/SearchResult"
      }
    },
    "hasMore": {
      "type": "boolean"
    },
    "cqlQuery": {
      "type": "string"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "totalSize": {
      "type": "integer",
      "format": "int32"
    },
    "searchDuration": {
      "type": "integer",
      "format": "int32"
    },
    "archivedResultCount": {
      "type": "integer",
      "format": "int32"
    },
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    }
  }
}
```

### SearchResult

```json
{
  "properties": {
    "title": {
      "type": "string",
      "example": "Page Title"
    },
    "excerpt": {
      "type": "string",
      "example": "This is an excerpt of the page content"
    },
    "url": {
      "type": "string",
      "example": "http://localhost:8080/confluence/display/SPACEKEY/Page+Title"
    },
    "resultParentContainer": {
      "$ref": "#/components/schemas/ContainerSummary"
    },
    "resultGlobalContainer": {
      "$ref": "#/components/schemas/ContainerSummary"
    },
    "iconCssClass": {
      "type": "string"
    },
    "lastModified": {
      "type": "string",
      "format": "date-time"
    },
    "friendlyLastModified": {
      "type": "string"
    },
    "resultGlobalContainerRef": {
      "$ref": "#/components/schemas/ReferenceContainerSummary"
    },
    "entity": {
      "type": "object"
    },
    "entityRef": {
      "$ref": "#/components/schemas/ReferenceObject"
    },
    "resultParentRef": {
      "$ref": "#/components/schemas/ReferenceContainerSummary"
    },
    "resourceType": {
      "$ref": "#/components/schemas/ResourceType"
    },
    "entityType": {
      "type": "string"
    },
    "_links": {
      "type": "object",
      "properties": {
        "base": {
          "type": "string"
        },
        "context": {
          "type": "string"
        },
        "self": {
          "type": "string"
        }
      }
    },
    "_expandable": {
      "type": "object",
      "properties": {
        "attribute": {
          "type": "string"
        }
      }
    }
  }
}
```

### SpaceSearchResult

```json
{}
```

### UserSearchResult

```json
{}
```

### SpaceColorSchemeTypeModel

```json
{
  "properties": {
    "type": {
      "type": "string",
      "example": "global"
    }
  }
}
```

### SpacePermission

```json
{
  "type": "object",
  "properties": {
    "operation": {
      "$ref": "#/components/schemas/OperationDescription"
    },
    "subject": {
      "$ref": "#/components/schemas/Subject"
    },
    "spaceKey": {
      "type": "string"
    },
    "spaceId": {
      "type": "integer",
      "format": "int64"
    }
  }
}
```

### JsonSpaceProperty

```json
{
  "properties": {
    "key": {
      "type": "string"
    },
    "value": {
      "$ref": "#/components/schemas/JsonString"
    },
    "version": {
      "$ref": "#/components/schemas/Version"
    },
    "space": {
      "$ref": "#/components/schemas/Space"
    },
    "spaceRef": {
      "$ref": "#/components/schemas/ReferenceSpace"
    },
    "_links": {
      "type": "object",
      "properties": {
        "base": {
          "type": "string"
        },
        "context": {
          "type": "string"
        },
        "self": {
          "type": "string"
        }
      }
    },
    "_expandable": {
      "type": "object",
      "properties": {
        "attribute": {
          "type": "string"
        }
      }
    }
  }
}
```

### PageResponseJsonSpaceProperty

```json
{
  "type": "object",
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/JsonSpaceProperty"
      }
    }
  }
}
```

### PageResponseSpace

```json
{
  "type": "object",
  "properties": {
    "totalCount": {
      "type": "integer",
      "format": "int64"
    },
    "pageRequest": {
      "$ref": "#/components/schemas/PageRequest"
    },
    "nextCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "prevCursor": {
      "$ref": "#/components/schemas/Cursor"
    },
    "results": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Space"
      }
    }
  }
}
```

### PasswordChangeDetails

```json
{
  "type": "object",
  "properties": {
    "oldPassword": {
      "type": "string",
      "example": "oldPassword"
    },
    "newPassword": {
      "type": "string",
      "example": "newPassword"
    }
  }
}
```

### UserSettings

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "example": "user1"
    },
    "locale": {
      "type": "string",
      "example": "en_GB"
    }
  }
}
```

### ContentWatch

```json
{
  "properties": {
    "watcher": {
      "$ref": "#/components/schemas/User"
    },
    "contentId": {
      "type": "string",
      "writeOnly": true
    },
    "content": {
      "$ref": "#/components/schemas/Content"
    }
  }
}
```

### UserKey

```json
{
  "properties": {
    "userKey": {
      "type": "string",
      "example": "4028d6768851c8900188556ba6000014"
    }
  }
}
```

### SpaceWatch

```json
{
  "properties": {
    "watcher": {
      "$ref": "#/components/schemas/User"
    },
    "space": {
      "$ref": "#/components/schemas/Space"
    },
    "contentTypes": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

### ReIndexTaskEntity

```json
{
  "properties": {
    "finished": {
      "type": "boolean"
    },
    "percentageComplete": {
      "type": "integer",
      "format": "int32"
    },
    "elapsedTime": {
      "type": "string"
    },
    "jobID": {
      "type": "integer",
      "format": "int32"
    }
  }
}
```

### ValidationResult

```json
{
  "properties": {
    "successful": {
      "type": "boolean"
    },
    "authorized": {
      "type": "boolean"
    },
    "valid": {
      "type": "boolean"
    },
    "errors": {
      "type": "object"
    },
    "allowedInReadOnlyMode": {
      "type": "boolean"
    }
  }
}
```

### RestError

```json
{
  "properties": {
    "statusCode": {
      "type": "integer",
      "format": "int32"
    },
    "data": {
      "$ref": "#/components/schemas/ValidationResult"
    },
    "message": {
      "type": "string"
    },
    "reason": {
      "type": "string"
    }
  }
}
```

### LongTaskSubmission

```json
{
  "properties": {
    "id": {
      "type": "string"
    },
    "links": {
      "type": "object",
      "example": {
        "result": "http://localhost:8080/confluence/rest/api/longtask/123/result",
        "status": "http://localhost:8080/confluence/rest/api/longtask/123/status"
      }
    },
    "resultPath": {
      "type": "string",
      "example": "result"
    },
    "statusPath": {
      "type": "string",
      "example": "status"
    }
  }
}
```

### Webhook

```json
{
  "properties": {
    "createdDate": {
      "type": "string",
      "format": "date-time"
    },
    "updatedDate": {
      "type": "string",
      "format": "date-time"
    },
    "sslVerificationRequired": {
      "type": "boolean"
    },
    "events": {
      "uniqueItems": true,
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/WebhookEvent"
      }
    },
    "name": {
      "type": "string"
    },
    "id": {
      "type": "integer",
      "format": "int32"
    },
    "scope": {
      "$ref": "#/components/schemas/WebhookScope"
    },
    "active": {
      "type": "boolean"
    },
    "configuration": {
      "type": "object"
    },
    "url": {
      "type": "string"
    },
    "credentials": {
      "$ref": "#/components/schemas/WebhookCredentials"
    }
  }
}
```

### WebhookCredentials

```json
{
  "properties": {
    "username": {
      "type": "string"
    },
    "password": {
      "type": "string"
    }
  }
}
```

### WebhookScope

```json
{
  "properties": {
    "id": {
      "maxLength": 255,
      "minLength": 0,
      "type": "string"
    },
    "type": {
      "maxLength": 255,
      "minLength": 0,
      "type": "string"
    }
  }
}
```

### WebhookEvent

```json
{
  "properties": {
    "id": {
      "type": "string"
    },
    "i18nKey": {
      "type": "string"
    }
  }
}
```

### DetailedInvocationResult

```json
{
  "properties": {
    "description": {
      "type": "string"
    },
    "outcome": {
      "type": "string",
      "enum": [
        "ERROR",
        "FAILURE",
        "SUCCESS"
      ]
    }
  }
}
```

### DetailedInvocationRequest

```json
{
  "properties": {
    "body": {
      "type": "string"
    },
    "headers": {
      "type": "object"
    },
    "method": {
      "type": "string",
      "enum": [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS",
        "HEAD"
      ]
    },
    "url": {
      "type": "string"
    }
  }
}
```

### DetailedInvocation

```json
{
  "properties": {
    "result": {
      "$ref": "#/components/schemas/DetailedInvocationResult"
    },
    "request": {
      "$ref": "#/components/schemas/DetailedInvocationRequest"
    },
    "eventScope": {
      "$ref": "#/components/schemas/WebhookScope"
    },
    "finish": {
      "type": "string",
      "format": "date-time"
    },
    "start": {
      "type": "string",
      "format": "date-time"
    },
    "id": {
      "type": "string"
    },
    "duration": {
      "type": "object",
      "properties": {
        "seconds": {
          "type": "integer",
          "format": "int64"
        },
        "zero": {
          "type": "boolean"
        },
        "nano": {
          "type": "integer",
          "format": "int32"
        },
        "negative": {
          "type": "boolean"
        },
        "positive": {
          "type": "boolean"
        },
        "units": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "durationEstimated": {
                "type": "boolean"
              },
              "timeBased": {
                "type": "boolean"
              },
              "dateBased": {
                "type": "boolean"
              }
            }
          }
        }
      }
    },
    "event": {
      "$ref": "#/components/schemas/WebhookEvent"
    }
  }
}
```

### JobStatistics

```json
{
  "properties": {
    "totalObjectsCount": {
      "type": "integer",
      "format": "int64",
      "example": 100
    },
    "processedObjectsCount": {
      "type": "integer",
      "format": "int64",
      "example": 50
    },
    "persistedObjectsCount": {
      "type": "integer",
      "format": "int64",
      "example": 50
    },
    "skippedObjectsCount": {
      "type": "integer",
      "format": "int64",
      "example": 0
    },
    "reusedObjectsCount": {
      "type": "integer",
      "format": "int64",
      "example": 10
    }
  }
}
```

### SiteRestoreJobDetails

```json
{
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "example": 1
    },
    "jobOperation": {
      "type": "string",
      "example": "BACKUP",
      "enum": [
        "BACKUP",
        "RESTORE"
      ]
    },
    "jobScope": {
      "type": "string",
      "example": "SITE",
      "enum": [
        "SPACE",
        "SITE"
      ]
    },
    "jobState": {
      "type": "string",
      "example": "IN_PROGRESS",
      "enum": [
        "QUEUED",
        "PROCESSING",
        "COMPLETING",
        "FINISHED",
        "CANCELLING",
        "CANCELLED",
        "FAILED"
      ]
    },
    "createTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "startProcessingTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "finishProcessingTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "cancelTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "errorMessage": {
      "type": "string",
      "example": "Error message"
    },
    "owner": {
      "type": "string",
      "example": "admin"
    },
    "cancelledBy": {
      "type": "string",
      "example": "admin"
    },
    "fileName": {
      "type": "string",
      "example": "backup-2020-01-01.zip"
    },
    "spaceKeys": {
      "type": "string",
      "example": "spaceKey1,spaceKey2"
    },
    "fileDeleteTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "fileExists": {
      "type": "boolean",
      "example": true
    },
    "jobSettings": {
      "$ref": "#/components/schemas/SiteRestoreSettings"
    },
    "statistics": {
      "$ref": "#/components/schemas/JobStatistics"
    },
    "jobStatistics": {
      "$ref": "#/components/schemas/JobStatistics"
    }
  }
}
```

### SpaceBackupJobDetails

```json
{
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "example": 1
    },
    "jobOperation": {
      "type": "string",
      "example": "BACKUP",
      "enum": [
        "BACKUP",
        "RESTORE"
      ]
    },
    "jobScope": {
      "type": "string",
      "example": "SITE",
      "enum": [
        "SPACE",
        "SITE"
      ]
    },
    "jobState": {
      "type": "string",
      "example": "IN_PROGRESS",
      "enum": [
        "QUEUED",
        "PROCESSING",
        "COMPLETING",
        "FINISHED",
        "CANCELLING",
        "CANCELLED",
        "FAILED"
      ]
    },
    "createTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "startProcessingTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "finishProcessingTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "cancelTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "errorMessage": {
      "type": "string",
      "example": "Error message"
    },
    "owner": {
      "type": "string",
      "example": "admin"
    },
    "cancelledBy": {
      "type": "string",
      "example": "admin"
    },
    "fileName": {
      "type": "string",
      "example": "backup-2020-01-01.zip"
    },
    "spaceKeys": {
      "type": "string",
      "example": "spaceKey1,spaceKey2"
    },
    "fileDeleteTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "fileExists": {
      "type": "boolean",
      "example": true
    },
    "jobSettings": {
      "$ref": "#/components/schemas/SpaceBackupSettings"
    },
    "statistics": {
      "$ref": "#/components/schemas/JobStatistics"
    },
    "jobStatistics": {
      "$ref": "#/components/schemas/JobStatistics"
    }
  }
}
```

### SiteBackupJobDetails

```json
{
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "example": 1
    },
    "jobOperation": {
      "type": "string",
      "example": "BACKUP",
      "enum": [
        "BACKUP",
        "RESTORE"
      ]
    },
    "jobScope": {
      "type": "string",
      "example": "SITE",
      "enum": [
        "SPACE",
        "SITE"
      ]
    },
    "jobState": {
      "type": "string",
      "example": "IN_PROGRESS",
      "enum": [
        "QUEUED",
        "PROCESSING",
        "COMPLETING",
        "FINISHED",
        "CANCELLING",
        "CANCELLED",
        "FAILED"
      ]
    },
    "createTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "startProcessingTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "finishProcessingTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "cancelTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "errorMessage": {
      "type": "string",
      "example": "Error message"
    },
    "owner": {
      "type": "string",
      "example": "admin"
    },
    "cancelledBy": {
      "type": "string",
      "example": "admin"
    },
    "fileName": {
      "type": "string",
      "example": "backup-2020-01-01.zip"
    },
    "spaceKeys": {
      "type": "string",
      "example": "spaceKey1,spaceKey2"
    },
    "fileDeleteTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "fileExists": {
      "type": "boolean",
      "example": true
    },
    "jobSettings": {
      "$ref": "#/components/schemas/SiteBackupSettings"
    },
    "statistics": {
      "$ref": "#/components/schemas/JobStatistics"
    },
    "jobStatistics": {
      "$ref": "#/components/schemas/JobStatistics"
    }
  }
}
```

### SpaceRestoreJobDetails

```json
{
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "example": 1
    },
    "jobOperation": {
      "type": "string",
      "example": "BACKUP",
      "enum": [
        "BACKUP",
        "RESTORE"
      ]
    },
    "jobScope": {
      "type": "string",
      "example": "SITE",
      "enum": [
        "SPACE",
        "SITE"
      ]
    },
    "jobState": {
      "type": "string",
      "example": "IN_PROGRESS",
      "enum": [
        "QUEUED",
        "PROCESSING",
        "COMPLETING",
        "FINISHED",
        "CANCELLING",
        "CANCELLED",
        "FAILED"
      ]
    },
    "createTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "startProcessingTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "finishProcessingTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "cancelTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "errorMessage": {
      "type": "string",
      "example": "Error message"
    },
    "owner": {
      "type": "string",
      "example": "admin"
    },
    "cancelledBy": {
      "type": "string",
      "example": "admin"
    },
    "fileName": {
      "type": "string",
      "example": "backup-2020-01-01.zip"
    },
    "spaceKeys": {
      "type": "string",
      "example": "spaceKey1,spaceKey2"
    },
    "fileDeleteTime": {
      "type": "string",
      "format": "date-time",
      "example": "2020-01-01T01:01:01Z"
    },
    "fileExists": {
      "type": "boolean",
      "example": true
    },
    "jobSettings": {
      "$ref": "#/components/schemas/SpaceRestoreSettings"
    },
    "statistics": {
      "$ref": "#/components/schemas/JobStatistics"
    },
    "jobStatistics": {
      "$ref": "#/components/schemas/JobStatistics"
    }
  }
}
```

### InstanceMetrics

```json
{
  "properties": {
    "pages": {
      "type": "integer",
      "format": "int32"
    },
    "spaces": {
      "type": "integer",
      "format": "int32"
    },
    "users": {
      "type": "integer",
      "format": "int32"
    }
  }
}
```

### ServerInformation

```json
{
  "properties": {
    "baseUrl": {
      "type": "string"
    },
    "version": {
      "type": "string"
    },
    "buildNumber": {
      "type": "integer",
      "format": "int32"
    },
    "marketplaceBuildNumber": {
      "type": "integer",
      "format": "int32"
    },
    "buildDate": {
      "type": "string"
    }
  }
}
```

### AttachmentExtractedText

```json
{
  "properties": {
    "extractedText": {
      "type": "string"
    }
  }
}
```

### Links

```json
{
  "properties": {
    "self": {
      "type": "string",
      "description": "Self link",
      "example": "https://instenv-320828-cq6e.instenv.internal.atlassian.com/rest/api/content/2326529/restriction/byOperation/read"
    },
    "base": {
      "type": "string",
      "description": "Base link",
      "example": "https://instenv-320828-cq6e.instenv.internal.atlassian.com"
    },
    "context": {
      "type": "string",
      "description": "Context link"
    }
  }
}
```

### PageResponseObject

```json
{
  "properties": {
    "results": {
      "type": "array",
      "description": "Results of the page response",
      "example": [],
      "items": {
        "type": "object",
        "description": "Results of the page response",
        "example": []
      }
    },
    "start": {
      "type": "integer",
      "description": "Start index of the page response",
      "format": "int32",
      "example": 0
    },
    "limit": {
      "type": "integer",
      "description": "Limit of the page response",
      "format": "int32",
      "example": 200
    },
    "size": {
      "type": "integer",
      "description": "Size of the results",
      "format": "int32",
      "example": 0
    }
  }
}
```

### Restrictions

```json
{
  "properties": {
    "user": {
      "$ref": "#/components/schemas/PageResponseObject"
    },
    "group": {
      "$ref": "#/components/schemas/PageResponseObject"
    }
  }
}
```

### Expandable

```json
{
  "properties": {
    "content": {
      "type": "string",
      "description": "Content link",
      "example": "/rest/api/content/2326529"
    }
  }
}
```

### OperationRestriction

```json
{
  "properties": {
    "operation": {
      "type": "string",
      "description": "The operation type",
      "example": "read"
    },
    "restrictions": {
      "$ref": "#/components/schemas/Restrictions"
    },
    "get_links": {
      "$ref": "#/components/schemas/Links"
    },
    "get_expandable": {
      "$ref": "#/components/schemas/Expandable"
    }
  }
}
```

### MockRestrictionsResponse

```json
{
  "properties": {
    "restrictions": {
      "type": "object",
      "description": "Map of operation to OperationRestriction, representing the restrictions by operation",
      "example": {
        "read": {
          "operation": "read",
          "restrictions": {
            "user": {
              "results": [],
              "start": 0,
              "limit": 200,
              "size": 0
            },
            "group": {
              "results": [],
              "start": 0,
              "limit": 200,
              "size": 0
            }
          },
          "_links": {
            "self": "https://instenv-320828-cq6e.instenv.internal.atlassian.com/rest/api/content/2326529/restriction/byOperation/read"
          },
          "_expandable": {
            "content": "/rest/api/content/2326529"
          }
        },
        "update": {
          "operation": "update",
          "restrictions": {
            "user": {
              "results": [],
              "start": 0,
              "limit": 200,
              "size": 0
            },
            "group": {
              "results": [],
              "start": 0,
              "limit": 200,
              "size": 0
            }
          },
          "_links": {
            "self": "https://instenv-320828-cq6e.instenv.internal.atlassian.com/rest/api/content/2326529/restriction/byOperation/update"
          },
          "_expandable": {
            "content": "/rest/api/content/2326529"
          }
        }
      }
    },
    "get_links": {
      "$ref": "#/components/schemas/Links"
    }
  }
}
```

## API Statistics

- **Total Endpoints**: 176
- **Categories**: 39
- **Schemas**: 125

**Methods Distribution**:

- **GET**: 87 endpoints
- **POST**: 33 endpoints
- **DELETE**: 17 endpoints
- **PUT**: 39 endpoints

